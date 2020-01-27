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
    const { email, password } = req.body
    // eslint-disable-next-line
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    if (!emailRe.test(email) || password.length < 8 || password.length > 20 || !passwordRe.test(password)) {
      return res.status(403).send({
        error: 'Registration failed'
      })
    }

    const hash = bcrypt.hashSync(password, SALT_ROUND)
    try {
      const user = await User.create({
        email: email.toLowerCase(),
        password: hash
      })
      const userJson = user.toJSON()

      res.send({
        token: jwtSignUser(userJson),
        user: userJson
      })
    } catch (err) {
      res.status(409).send({
        error: 'This email account is already in use'
      })
    }
  },

  async login(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase() }
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
        token: jwtSignUser(userJson),
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to log in'
      })
    }
  }
}
