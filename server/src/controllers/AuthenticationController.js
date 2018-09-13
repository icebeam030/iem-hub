const { User } = require('../models')

module.exports = {
  // try to create a user in the database
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'This email address is already in use!'
      })
    }
  }
}
