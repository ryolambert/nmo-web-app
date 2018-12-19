const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  recareas: forwardTo('db'),
  recarea: forwardTo('db'),
  recAreasConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
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
        where: { id: args.id },
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
          user: { id: userId },
        },
      },
      info
    );
  },
  // async totalFavorByCurrentUser(parent)
};

module.exports = Query;
