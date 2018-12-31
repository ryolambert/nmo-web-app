const { forwardTo } = require('prisma-binding');
const { hasPermission, getUserId } = require('../utils/utils');

const Query = {
  activity: forwardTo('db'),
  activitiesConnection: (parent, args, ctx, info) => {
    getUserId(ctx);
    return forwardTo('db')(parent, args, ctx, info);
  },
  recAreas: forwardTo('db'),
  recArea: forwardTo('db'),
  recAreasConnection: forwardTo('db'),
  images: forwardTo('db'),
  image: forwardTo('db'),
  imagesConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    const userId = getUserId(ctx);

    // 2. Check if the user has the permissions to query all the users
    const requestingUserIsAdmin = await ctx.db.exists.user({
      id: userId,
      permissions: ['ADMIN', 'PERMISSIONUPDATE']
    });

    if (!requestingUserIsAdmin) {
      throw new Error(`Invalid permissions, you do not have the required admin access to update user permissions. 😱`);
    }

    // . if they do, query all the users!
    return ctx.db.query.users(
      {
        ...args
      },
      info
    );
  },
  // async recArea(parent, { id }, ctx, info) {
  //   const queriedRecArea = await ctx.db.query.recArea(
  //     {
  //       where: { id }
  //     },
  //     info
  //   );
  //   if (queriedRecArea) {
  //     return queriedRecArea;
  //   }
  //   throw new Error(`Couldn't find the area id: ${id}`);
  // },
  // async recAreas(parent, args, ctx, info) {
  //   const queriedRecAreas = await ctx.db.query.recAreas(
  //     {
  //       ...args
  //     },
  //     info
  //   );
  // },
  async favorite(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    const userId = getUserId(ctx);
    // 2. Check is user is owner of favorite
    const requestingUserIsOwner = await ctx.db.exists.Favorite(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
    // 3. Check if they have the permissions to see this favorite
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: userId,
      permissions: 'ADMIN'
    });
    if (requestingUserIsOwner || requestingUserIsAdmin) {
      return ctx.db.query.favorite(
        {
          where: {
            id
          }
        },
        info
      );
    }
    // 4. Throw an error if neither owner or an admin 
    throw new Error('Invalid permissions, you either must be an admin or owner of this favorite to view it 🙈');
  },
  async favorites(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    if (!userId) {
      throw new Error('You must be signed in.');
    }
    return ctx.db.query.favorites(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  },
  async totalFavorByRecArea(parent, { recAreaId }, ctx, info) {
    return ctx.db.query.favoritesConnection(
      {
        where: {
          recArea: {
            id: recAreaId
          }
        }
      },
      info
    );
  },
  async totalFavorByCurrentUser(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    return await ctx.db.query.favoritesConnection(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  },
  async totalReviewsByRecArea(parent, { recAreaId }, ctx, info) {
    return ctx.db.query.reviewsConnection(
      {
        where: {
          recArea: {
            id: recAreaId
          }
        }
      },
      info
    );
  },
  async totalReviewsByCurrentUser(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.db.query.reviewsConnection(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  },
  async topRatedRecAreas(parent, args, ctx, info) {
    return ctx.db.query.recAreas({ orderBy: 'rating_DESC' }, info);
  },
  async topFavoriteRecAreas(parent, args, ctx, info) {
    return ctx.db.query.recAreas({ orderBy: 'favorite_DESC' }, info);
  },
  async imagesByRecArea(parent, { recAreaId }, ctx, info) {
    return ctx.db.query.images(
      {
        where: {
          recArea: {
            id: recAreaId
          }
        }
      },
      info
    );
  },
  async imagesByCurrentUser(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.db.query.imagesConnection({
      where: {
        user: {
          id: userId
        }
      }
    });
  },
  async imagesByReview(parent, { reviewId }, ctx, info) {
    return ctx.db.query.reviewsConnection(
      {
        where: {
          review: {
            id: reviewId
          }
        }
      },
      info
    );
  }
};

module.exports = Query;
