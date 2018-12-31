const {forwardTo} = require('prisma-binding');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { sendWelcomeEmail, sendResetEmail } = require('../utils/mail');
const { hasPermission, getUserId } = require('../utils/utils');

require('dotenv').config({ path: 'variables.env' });

async function deleteActivity(parent, args, ctx, info) {
  console.log('****ISSUE****');
  const userId = getUserId(ctx);
  const user = await ctx.db.query.user({ where: { id: userId } });
  console.log('user', user);

  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'ACTIVITYDELETE']
  });
  console.log('requestingUserIsAdmin', requestingUserIsAdmin);

  const activityExists = await ctx.db.exists.Activity({
    id: args.id
  });

  if (!activityExists && !requestingUserIsAdmin) {
    throw new Error(
      `Activity not found or you don't have access rights to delete it.`
    );
  }
  return forwardTo('db')(parent, args, ctx, info);
  // return ctx.db.mutation.deleteActivity({ where: { id } })
}

async function deleteUser (parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const userExists = await ctx.db.exists.User({
    id
  })
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'USERDELETE']
  })

  if (!userExists && !requestingUserIsAdmin) {
    throw new Error(`User not found or you don't have access rights to delete it.`)
  }

  return ctx.db.mutation.deleteUser({ where: { id } })
}

async function createRecArea(parent, args, ctx, info) {
  const userId = getUserId(ctx);
  const data = args.data;
  // 1. Check for valid user/sign-in
  if (!userId) {
    throw new Error(
      `Invalid permissions, you must be an active user to create an area.`
    );
  }
  // 2. Verify if recArea exists already or not
  const recAreaExists = await ctx.db.exists.RecArea(
    {
      lat: data.lat,
      long: data.long
    },
    info
  );
  if (recAreaExists) {
    throw new Error(
      `An area at that location: latitude- ${data.lat}, longitude ${
        data.long
      } already exists`
    );
  }

  // 3. Create new rec area
  const newRecArea = await ctx.db.mutation.createRecArea(
    {
      data: {
        // This is how to create a relationship between the RecArea and the User
        user: {
          connect: {
            id: userId
          }
        },
        ...args
      }
    },
    info
  );
  // * Development util
  console.log(newRecArea);

  if (newRecArea) {
    return newRecArea;
  }
  throw new Error(`Area cannot be created`);
}

async function updateRecArea(parent, args, ctx, info) {
  // 1. Make sure user is logged in
  const userId = getUserId(ctx);
  // 2. Copy the inputted updates and find recArea updated
  const updates = { ...args.data };
  const recAreaId = args.where.id;
  //3. Verify if recArea exists/owned
  const recAreaExists = await ctx.db.exists.RecArea(
    {
      where: {
        user: {
          id: userId
        }
      }
    },
    info
  );
  // 4. Verify is user is an admin with permissions
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'RECAREAUPDATE']
  });
  // 5. Verify if recArea exists/owned or user has admin rights
  if (!recAreaExists && !requestingUserIsAdmin) {
    throw new Error(
      `Invalid permissions, the area either A(doesn't exist), B(you don't have ownership), or C(you aren't an admin with permission) to update it. 🙈`
    );
  }
  // 6.(Final) Update recArea
  return ctx.db.mutation.updateRecArea(
    {
      where: {
        id: recAreaId
      },
      data: {
        ...updates
      }
    },
    info
  );
}

async function deleteRecArea(parent, args, ctx, info) {
  // 1. Make sure user is logged in
  const userId = getUserId(ctx);
  // 2. Verify if recArea exists
  const recAreaExists = await ctx.db.exists.RecArea(
    {
      id: args.recAreaId,
      user: { id: userId }
    },
    info
  );
  // 3. Verify is user is an admin with permissions
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'RECAREADELETE']
  });
  // 5. Verify if the area exists or an admin with permissions to delete
  if (!recAreaExists && !requestingUserIsAdmin) {
    throw new Error(
      `Invalid permissions, the area either A(doesn't exist), B(you don't have ownership), or C(you aren't an admin with permission) to delete it. 🙈`
    );
  }
  // 6.(Final) Delete recArea
  return ctx.db.mutation.deleteRecArea({ where: { id: args.recAreaId } });
}

async function createImage(parent, args, ctx, info) {
  // 1. Check user sign in
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be signed in to upload an image 😔');
  }

  // 2. Image-User db relationship && image link mutation
  const image = await ctx.db.mutation.createImage(
    {
      data: {
        // Image-User relationship connection
        user: {
          connect: {
            id: userId
          }
        },
        ...args
      }
    },
    info
  );

  // 3. Console image check
  console.log(image);

  // 4. return created image
  if (image) {
    return image;
  }
  throw new Error(`Image string cannot be uploaded to database`);
}

async function deleteImage(parent, { id }, ctx, info) {
  // 1. User login check
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be signed in to delete an image 😔');
  }
  // 2. Check if image exists/owned
  const imageExists = await ctx.db.exists.Image(
    {
      id,
      user: { id: userId }
    },
    info
  );
  // 3. Check ownership/permissions
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'IMAGEDELETE']
  });
  // 4. Check if the image exists/owned or an admin with permissions to delete
  if (!imageExists && !requestingUserIsAdmin) {
    throw new Error(
      `Invalid permissions, the image either A(doesn't exist), B(you don't have ownership), or C(you aren't an admin with permission) to delete it. 🙈`
    );
  }
  // 5. Delete image
  return ctx.db.mutation.deleteImage({ where: { id } }, info);
}

async function addToFavorites(parent, args, ctx, info) {
  // 1. Make sure they are signed in
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be signed in to add favorites. 😿');
  }
  // 2. Verify if favorite exists
  const isFavored = await ctx.db.exists.Favorites({
    user: { id: userId },
    recArea: { id: args.id }
  });
  // 3. Check if that recArea is already in their favorites
  if (isFavored) {
    throw new Error('Already in favorites');
  }
  // 4. Favorite-User-RecArea db relationship link mutation
  const newFavorite = ctx.db.mutation.createFavorite(
    {
      data: {
        user: {
          connect: { id: userId }
        },
        recArea: {
          connect: { id: args.recAreaId }
        }
      }
    },
    info
  );
  // 5. Return created favorite
  if (newFavorite) {
    return newFavorite;
  }
  throw new Error(`Favorite was not saved to database`);
}

async function removeFromFavorites(parent, args, ctx, info) {
  // 1. Check user is signed in
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be signed in to remove a favorite. 😿');
  }
  // 2. Query favorite
  const favorite = await ctx.db.query.favorites({
    user: {
      id: userId
    },
    recArea: {
      id: args.id
    }
  });
  // 3. Delete that favorite
  if (favorite) {
    return ctx.db.mutation.deleteFavorite(
      {
        where: { id: favorite[0].id }
      },
      info
    );
  }
  throw new Error(`User never had this area as a favorite.`);
}

async function createReview(parent, args, ctx, info) {
  // 1. Make sure user is signed in
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be signed in to create a review. 😫');
  }
  // 2. Check if review exists
  const isReviewed = await ctx.db.exists.Reviews({
    where: {
      user: { id: userId },
      recArea: { id: args.id }
    }
  });
  // 3. Check if the user has already left a review on that recArea
  if (isReviewed) {
    throw new Error(
      'Already left a review, feel free to update your existing review! 👍'
    );
  }
  // 4. If not, send out a new review to the database
  return ctx.db.mutation.createReview(
    {
      data: {
        user: {
          connect: { id: userId }
        },
        recArea: {
          connect: { id: args.id }
        }
      }
    },
    info
  );
}

async function updateReview(parent, args, ctx, info) {
  // 1. Make sure user is logged in
  const userId = getUserId(ctx);
  // 2. Copy the inputted updates and find review updated
  const updates = { ...args.data };
  const reviewId = args.where.id;
  //3. Verify if review exists/owned
  const reviewExists = await ctx.db.exists.RecArea(
    {
      where: {
        user: { id: userId },
        recArea: { id: args.id }
      }
    },
    info
  );
  // 4. Verify is user is an admin with permissions
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'REVIEWUPDATE']
  });
  // 5. Verify if review exists/owned or user has admin rights
  if (!reviewExists && !requestingUserIsAdmin) {
    throw new Error(
      `Invalid permissions, the review either A(doesn't exist), B(you don't have ownership), or C(you aren't an admin with permission) to update it. 🤔`
    );
  }
  // 6.(Final) Update review
  return ctx.db.mutation.updateReview(
    {
      where: {
        id: reviewId
      },
      data: {
        ...updates
      }
    },
    info
  );
}

async function deleteReview(parent, args, ctx, info) {
  // 1. Make sure user is logged in
  const userId = getUserId(ctx);
  // 2. Verify if recArea exists
  const reviewExists = await ctx.db.exists.Review(
    {
      id: args.reviewId,
      user: { id: userId }
    },
    info
  );
  // 3. Verify is user is an admin with permissions
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    permissions: ['ADMIN', 'REVIEWDELETE']
  });
  // 5. Verify if the review exists/owned or an admin with permissions to delete
  if (!reviewExists && !requestingUserIsAdmin) {
    throw new Error(
      `Invalid permissions, the review either A(doesn't exist), B(you don't have ownership), or C(you aren't an admin with permission) to delete it. 🤔`
    );
  }
  // 6.(Final) Delete review
  return ctx.db.mutation.deleteReview({ where: { id: args.reviewId } });
}

//^__________________________🔐 AUTH RESOLVERS_______________________________^//
async function signup(parent, args, ctx, info) {
  // lowercase their email
  args.email = args.email.toLowerCase();
  // hash their password
  const password = await bcrypt.hash(args.password, 10);
  // Set a reset token
  const resetToken = randomBytes(20).toString('hex');
  // const randomBytesPromiseified = promisify(randomBytes);
  // const resetToken = (await randomBytesPromiseified(20)).toString('hex');
  // Set email validation token
  const validateEmailToken = randomBytes(20).toString('hex');
  // const validateEmailToken = (await randomBytesPromiseified(20)).toString('hex');
  // Log email token
  console.log('validateEmailToken', validateEmailToken);
  // const { admin, ...data } = args;

  // Create the user in the database
  const user = await ctx.db.mutation.createUser({
    data: {
      ...args,
      password,
      permissions: { set: ['USER'] },
      resetToken,
      validateEmailToken
    }
  });
  // Make session request
  ctx.request.session.userId = user.id;
  // Log user
  console.log(user);
  // Sends out user welcome email with account validation token
  sendWelcomeEmail(user, ctx);
  // // create the JWT token for them
  // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // // We set the jwt as a cookie on the response
  // ctx.response.cookie('token', token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  // });
  // Lastly, we return the user to the browser
  return {
    // token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  };
}

async function sendLinkValidateEmail(parent, args, ctx, info) {
  // 1. Check if user is logged in
  const id = getUserId(ctx);
  if (!id) {
    throw new Error(
      'You must be signed up/in to send a email validation link. ☹'
    );
  }
  // 2. Query the current user
  const userMe = await ctx.db.query.user({ where: { id } }, info);

  // 3. Generate/send welcome email
  return sendWelcomeEmail(userMe, ctx)
    .then(data => {
      return userMe;
    })
    .catch(data => {
      throw new Error(`Error. cannot send email to: ${userMe.email}`);
    });
}

async function signin(parent, { email, password }, ctx, info) {
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
  // 3. Return the user
  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  };
}

function signout(parent, args, ctx, info) {
  ctx.response.clearCookie('token');
  return { message: 'Goodbye!' };
}

async function requestReset(parent, { email }, ctx, info) {
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
}

async function resetPassword(parent, { oldPassword, newPassword }, ctx, info) {
  let userId = getUserId(ctx)
  console.log(userId)
  const user = await ctx.db.query.user({ where: { id: userId } })
  const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)
  if (!oldPasswordValid) {
    console.log('old Password not Valid')
    throw new Error('Old password is wrong, please try again.')
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  try {
    await ctx.db.mutation.updateUser({
      where: { id: userId },
      data: { password: newPasswordHash }
    })
  } catch (e) {
    return e
  }
  return user
}

async function validateEmail(parent, args, ctx, info) {
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
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  };
}

async function updatePermissions(parent, args, ctx, info) {
  // 1. Check if they are logged in
  const userId = getUserId(ctx);
  if (!userId) {
    throw new Error('You must be logged in to update permissions.');
  }
  // 2. Query the current user
  const userMe = await ctx.db.query.user({ where: { userId } }, info);
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

const Mutation = {
  createActivity: forwardTo('db'),
  updateActivity: forwardTo('db'),
  deleteActivity: deleteActivity,
  createRecArea,
  updateRecArea,
  deleteRecArea,
  signup,
  signin,
  signout,
  requestReset,
  resetPassword,
  sendLinkValidateEmail,
  validateEmail,
  updatePermissions,
  // createUser: forwardTo('db'),
  // updateUser: (parent, args, ctx, info) => {
  //   // getUserId(ctx);
  //   return forwardTo('db')(parent, args, ctx, info);
  // },
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  createImage,
  deleteImage,
  createReview,
  updateReview,
  deleteReview
};

module.exports = { Mutation };
