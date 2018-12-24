// Passport-js Oauth Strategies 
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const TwitterStrategy = require('passport-twitter');

const db = require('../db');

const initPassport = () => {
  passport.serializeUser
  ((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // search in database for that user in the cookie by their id
    // and return that user
    const user = await db.user({ id });
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // callback function
        // here you save the new user to database or retrieve it if exists
        // when done with founding or creating user return it to done() func
        // done(null, user)
        const currentUser = await db.user({ facebookId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await db.createUser({
            facebookId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          done(null, newUser);
        }
      },
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await db.user({ googleId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await db.createUser({
            googleId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            email: profile.email.value
          });
          done(null, newUser);
        }
      },
    ),
  );

  // TODO: Check with the passport docs on twitter strategy implementation
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
        includeEmail: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await db.user({ twitterId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await db.createUser({
            twitterId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            email: profile.email[0].value
          });
          done(null, newUser);
        }
      },
    ),
  );
};

module.exports = initPassport;