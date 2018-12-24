const passport = require('passport');
const { Router } = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const middleWare = Router();
middleWare.use(
  cookieSession({
    keys: [process.env.APP_SECRET],
    maxAge: 1000 * 60 * 60 * 24 * 7 // * Cookie age set to 7 days
  })
);

middleWare.use(passport.initialize());
middleWare.use(passport.session());

module.exports = middleWare;