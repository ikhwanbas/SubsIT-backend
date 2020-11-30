const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const passport = require('passport')
const { Strategy } = require('passport-http-bearer')

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

passport.use(new Strategy(
  (token, done) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        done(err)
      }
      done(null, decoded)
    })
  }))

module.exports = passport