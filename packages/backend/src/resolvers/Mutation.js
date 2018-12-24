const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { sendWelcomeEmail, sendResetEmail } = require('../utils/mail');
const { hasPermission } = require('../utils');

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
    // async create
  };

module.exports = Mutations;
