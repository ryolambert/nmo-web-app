const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Context, getUserId } = require('../utils')
const { sendWelcomeEmail, sendResetEmail }= require('../utils/mail');
const crypto = require('crypto')
const hasPermission = require('../utils/utils.js')

// resolve the `AuthPayload` type
const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  }
}

const Auth = {
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

module.exports = {
  Auth,
  AuthPayload
}
