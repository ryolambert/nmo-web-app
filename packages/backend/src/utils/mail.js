const nodemailer = require('nodemailer');
const config = require('../config/config');

module.exports = {
  async sendWelcomeEmail (user, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: user.email,
      from: 'nm-outdoors@gmail.com',
      subject: 'Welcome to NM-Outdoors 🌄',
      html: `
      <div>hello ${user.name}</div>
      <div>Welcome to New Mexico Outdoors 🤗.</div>
        <div>Please use the link provided below to validate your email.
           ${ctx.request.headers.origin}/validateEmail?validateEmailToken=${user.validateEmailToken}

        </div>
    `
    }
    return mailer.sendMail(mailOptions)
  },
  sendResetEmail (uniqueId, email, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: email,
      from: 'nm-outdoors@gmail.com',
      subject: 'Password Reset - NM-Outdoors 🌄',
      html: `
      <div>hello</div>
      <div>Please find link to reset your password.
         ${ctx.request.headers.origin}/resetPassword?resetPasswordToken=${uniqueId}
      </div>
    `
    }
    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Mail sent to: ' + email)
      }
    })
  }
};
