const jwt = require('jsonwebtoken')
const { Prisma } = require('prisma-binding')

const APP_SECRET = 'appsecret321'

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  // console.log(Authorization)
  if (Authorization && Authorization !== 'null') {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
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

module.exports = {
  getUserId,
  AuthError,
  APP_SECRET,
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

exports.hasPermission = hasPermission;