const { Rating } = require('../models')

module.exports = {
  // fetch user rating of a certain IEM
  async index (req, res) {
    try {
      const userId = req.query.userId
      const iemId = req.query.iemId
      const rating = await Rating.findAll({
        where: {
          userId: userId,
          iemId: iemId
        }
      })

      res.send(rating)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to fetch user ratings'
      })
    }
  },
  // show average rating for a certain IEM
  async show (req, res) {
    try {
      const iemId = req.params.iemId
      const sum = await Rating.sum('rating', {
        where: {
          iemId: iemId
        }
      })
      const count = await Rating.count({
        where: {
          iemId: iemId
        }
      })
      const averageRating = Number.parseFloat(sum / count).toFixed(1)
      res.send({
        averageRating: averageRating
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to fetch average rating'
      })
    }
  },
  // update rating for a certain IEM
  async put (req, res) {
    try {
      const { userId, iemId } = req.body

      const rating = await Rating.findOne({
        where: {
          userId: userId,
          iemId: iemId
        }
      })
      if (!rating) {
        await Rating.create(req.body)
        res.send(req.body)
      }

      await Rating.update(req.body, {
        where: {
          userId: userId,
          iemId: iemId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to update rating information'
      })
    }
  }
}
