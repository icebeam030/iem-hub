const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../config/config')
const { User } = require('../models')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async (jwtPayload, done) => {
    try {
      // confirm the user is signed by jwt and in the database
      const user = await User.findOne({
        where: { id: jwtPayload.id }
      })
      if (!user) {
        return done(new Error(), false)
      }

      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
