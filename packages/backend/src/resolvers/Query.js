const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils/utils');

const Query = {
  recAreas: forwardTo('db'),
  recArea: forwardTo('db'),
  recAreasConnection: forwardTo('db'),
  images: forwardTo('db'),
  image: forwardTo('db'),
  imagesConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    console.log(ctx.request.userId);
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 2. if they do, query all the users!
    return ctx.db.query.users({}, info);
  },
  // async recarea(parent, args, ctx, info) {
  //   const queriedRecAreas = await ctx.db.query.recareas(
  //     {
  //       where: { id: args.id },
  //     },
  //     info
  //   );
  //   if (queriedRecAreas) {
  //     return queriedRecAreas;
  //   }
  //   throw new Error(`No recreational areas have been added`);
  // },
  async favorite(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You arent logged in!');
    }
    // 2. Query the current order
    const favorite = await ctx.db.query.favorite(
      {
        where: { id: args.id }
      },
      info
    );
    // 3. Check if the have the permissions to see this order
    const ownsFavorite = favorite.user.id === ctx.request.userId;
    const hasPermissionToSeeFavorite = ctx.request.user.permissions.includes(
      'ADMIN'
    );
    if (!ownsFavorite || !hasPermission) {
      throw new Error('You cant see this 🙈');
    }
    // 4. Return the favorite
    return favorite;
  },
  async favorites(parent, args, ctx, info) {
    const { userId } = ctx.request;
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
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    return ctx.db.query.favoritesConnection(
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
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in!');
    }
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
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in!');
    }
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
  },
};

module.exports = Query;
