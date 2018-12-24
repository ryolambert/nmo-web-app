// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { sendWelcomeEmail, sendResetEmail }= require('../utils/mail');
// const crypto = require('crypto')
// const hasPermission = require('../utils/utils.js')

// resolve the `AuthPayload` type
const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  }
}

module.exports = {
  AuthPayload
}
