const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/config')
const { User } = require('../models')

const SALT_ROUND = 10

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body
      const hash = bcrypt.hashSync(password, SALT_ROUND)

      const user = await User.create({
        email: email.toLowerCase(),
        password: hash
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(409).send({
        error: 'This email account is already in use'
      })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email.toLowerCase()
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Incorrect login information'
        })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Incorrect login information'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to log in'
      })
    }
  }
}
