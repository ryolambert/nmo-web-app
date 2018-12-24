const jwt = require('jsonwebtoken')
const { Prisma } = require('prisma-binding')

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  // console.log(Authorization)
  if (Authorization && Authorization !== 'null') {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  } else {
    throw new AuthError()
  }
}


class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

module.exports = {
  getUserId,
  hasPermission,
  AuthError
}