const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { sendWelcomeEmail, sendResetEmail }= require('../utils/mail');
const { hasPermission } = require('../utils/utils');

const Mutations = {
  async createRecArea(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    const recArea = await ctx.db.mutation.createRecArea(
      {
        data: {
          // This is how to create a relationship between the RecArea and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    console.log(recArea);

    return recArea;
  },
  updateRecArea(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateRecArea(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteRecArea(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the recarea
    const recarea = await ctx.db.query.recarea(
      { where },
      `{ id title user { id }}`
    );
    // 2. Check if they own that recarea, or have the permissions
    const ownsRecArea = recarea.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'RECAREADELETE'].includes(permission)
    );

    if (!ownsRecArea && !hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Delete it!
    return ctx.db.mutation.deleteRecArea({ where }, info);
  },
  async addToFavorites(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in to do that 😿');
    }
    // 2. Query the users current favorites
    const isFavored = await ctx.db.query.favorites({
      where: {
        user: { id: userId },
        recarea: { id: args.id }
      }
    });
    // 3. Check if that recarea is already in their favorites
    if (isFavored) {
      throw new Error('Already in favorites');
    }
    // 4. If its not, create a fresh Favorite for that user!
    return ctx.db.mutation.createFavorite(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          recarea: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromFavorites(parent, args, ctx, info) {
    // 1. Find the cart recarea
    const favorite = await ctx.db.query.favorites(
      {
        where: {
          id: args.id
        }
      },
      `{ id, user { id }}`
    );
    // 1.5 Make sure we found an recarea
    if (!favorite) throw new Error('No Favorite Found!');
    // 2. Make sure they own that recarea
    if (favorite.user.id !== ctx.request.userId) {
      throw new Error('No cheating');
    }
    // 3. Delete that favorite
    return ctx.db.mutation.deleteFavorite(
      {
        where: { id: args.id }
      },
      info
    );
  },
  async createReview(parent, args, ctx, info) {
    // 1. Make sure user is signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error ('You must be signed in to do that 😿');
    }
    // 2. Query the users current reviews 
    const isReviewed = await ctx.db.query.reviews({
      where: {
        user: { id: userId },
        recarea: { id: args.id }
      }
    });
    // 3. Check if the user has already left a review on that recarea
    if (isReviewed) {
      throw new Error('Already left a review, feel free to update your existing review! 👍');
    }
    // 4. If not, send out a new review to the database
    return ctx.db.mutation.createReview(
      {
        data: {
          user: {
            connect: { id: userId}
          },
          recarea: {
            connect: { id: args.id }
          }
        }
      },
    );
    },
    async updateReview(parent, args, ctx, info) {
      // 1. Take a copy of the updates
      const updates = { ...args };
      // 2. Remove the current ID from the updates
      delete updates.id;
      // 3. Run the update method
      return ctx.db.mutation.updateReview(
        {
          data: updates,
          where: {
            id: args.id
          }
        },
        info
      );
    },
    async deleteReview(parent, args, ctx, info) {
      const where = { id: args.id };
      // 1. Find the review 
      const review = await ctx.db.query.review(
        { where },
        `{ id title user { id }}`
      );
      // 2. Verify review ownership, or for permissions
      const ownsReview = review.user.id === ctx.request.userId;
      const hasPermissions = ctx.request.user.permissions.some(permission =>
        ['ADMIN', 'REVIEWDELETE'].includes(permission)
        );

      if (!ownsReview && !hasPermissions) {
        throw new Error("You don't have permission to do that! 😔");
      }

      // 3. Delete the review
      return ctx.db.mutation.deleteReview({ where }, info);
    },
    async signup(parent, args, ctx, info) {
      // lowercase their email
      args.email = args.email.toLowerCase();
      // hash their password
      const password = await bcrypt.hash(args.password, 10);
      // Set a reset token and expiry on that user
      const randomBytesPromiseified = promisify(randomBytes);
      const resetToken = (await randomBytesPromiseified(20)).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
      const validateEmailToken = (await randomBytesPromiseified(20)).toString(
        'hex'
      );
      console.log('validateEmailToken', validateEmailToken);
      // const { admin, ...data } = args;
  
      // create the user in the database
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            password,
            permissions: { set: ['USER'] },
            resetToken,
            resetTokenExpiry,
            validateEmailToken
          }
        },
        info
      );
      // Sends out user welcome email with account validation token
      sendWelcomeEmail(user, ctx);
      // create the JWT token for them
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      // We set the jwt as a cookie on the response
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
      });
      // Lastly, we return the user to the browser
      return user;
    },
    async sendLinkValidateEmail(parent, args, ctx, info) {
      // 1. Check if user is logged in
      if (!ctx.request.userId) {
        throw new Error('You must be logged in to do that! 🙈');
      }
      // 2. Query the current user
      const currentUser = await ctx.db.query.user(
        { 
          where: {
             id: ctx.request.userId, 
            },
           },
           info
           );
  
      return sendWelcomeEmail(currentUser, ctx)
        .then(data => {
          return currentUser;
        })
        .catch(data => {
          throw new Error(`Error. cannot send email to: ${currentUser.email}`);
        });
    },
    async signin(parent, { email, password }, ctx, info) {
      // 1. check if there is a user with that email
      const user = await ctx.db.query.user({ where: { email } });
      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }
      // 2. Check if their password is correct
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid Password!');
      }
      // 3. generate the JWT Token
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      // 4. Set the cookie with the token
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });
      // 5. Return the user
      return user;
    },
    signout(parent, args, ctx, info) {
      ctx.response.clearCookie('token');
      return { message: 'Goodbye!' };
    },
    async requestReset(parent, { email }, ctx, info) {
      // 1. Check if this is a real user
      const user = await ctx.db.query.user({ where: { email } });
      if (!user) {
        throw new Error(`No such user found for email: ${email}`);
      }
      // If real then crates a resetToken and Expiry and sends out via mail function
      try {
        const randomBytesPromiseified = promisify(randomBytes);
        const uniqueId = (await randomBytesPromiseified(20)).toString('hex');
        await ctx.db.mutation.updateUser({
          where: { id: user.id },
          data: {
            resetPasswordExpires: new Date().now() + 1000 * 60 * 60 * 1, // 1 hour
            resetPasswordToken: uniqueId
          }
        });
        sendResetEmail(uniqueId, email, ctx);
      } catch (e) {
        return e;
      }
      return user;
    },
    async resetPassword(parent, args, ctx, info) {
      // 1. check if the passwords match
      if (args.password !== args.confirmPassword) {
        throw new Error("Passwords don't match!");
      }
      // 2. check if its a legit reset token
      // 3. Check if its expired
      const [user] = await ctx.db.query.users({
        where: {
          resetToken: args.resetToken,
          resetTokenExpiry_gte: Date.now() - 3600000
        }
      });
      if (!user) {
        throw new Error('This token is either invalid or expired!');
      }
      // 4. Hash their new password
      const password = await bcrypt.hash(args.password, 10);
      // 5. Save the new password to the user and remove old resetToken fields
      const updatedUser = await ctx.db.mutation.updateUser({
        where: { email: user.email },
        data: {
          password,
          resetToken: null,
          resetTokenExpiry: null
        }
      });
      // 6. Generate JWT
      const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
      // 7. Set the JWT cookie
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });
      // 8. return the new user
      return updatedUser;
    },
    async validateEmail(parent, args, ctx, info) {
      const userCheck = await ctx.db.query.user({
        where: {
          validateEmailToken: args.validateEmailToken
        }
      });
      if (!userCheck) {
        throw new Error(`No such user found.`);
      } else {
        if (userCheck.emailValidated) {
          throw new Error(`User Already validated`);
        }
      }
  
      // try {
      const user = await ctx.db.mutation.updateUser({
        // Must check resetPasswordExpires
        where: { validateEmailToken: args.validateEmailToken },
        data: {
          emailValidated: true
        }
      });
      // return user
      return {
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user
      };
    },
    async updatePermissions(parent, args, ctx, info) {
      // 1. Check if they are logged in
      if (!ctx.request.userId) {
        throw new Error('You must be logged in!');
      }
      // 2. Query the current user
      const currentUser = await ctx.db.query.user(
        {
          where: {
            id: ctx.request.userId
          }
        },
        info
      );
      // 3. Check if they have permissions to do this
      hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
      // 4. Update the permissions
      return ctx.db.mutation.updateUser(
        {
          data: {
            permissions: {
              set: args.permissions
            }
          },
          where: {
            id: args.userId
          }
        },
        info
      );
    }
  };

module.exports = Mutations;
