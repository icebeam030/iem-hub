const { Rating } = require('../models')

module.exports = {
  // fetch user rating of a certain IEM
  async index(req, res) {
    try {
      const userId = req.user.id
      const { iemId } = req.query

      let rating = await Rating.findAll({
        where: {
          userId: userId,
          iemId: iemId
        }
      })
      if (rating.length > 0) {
        rating = { rating: rating[0].rating }
      } else {
        rating = { rating: null }
      }

      res.send(rating)
    } catch (err) {
      res.status(500).send({
        error: 'Error fetching rating'
      })
    }
  },

  // show average rating for a certain IEM
  async show(req, res) {
    try {
      const iemId = req.params.iemId
      let averageRating = await Rating.findOne({
        where: { iemId: iemId }
      })
      if (!averageRating) {
        return res.send({
          averageRating: 'No review yet'
        })
      }

      const sum = await Rating.sum('rating', {
        where: { iemId: iemId }
      })
      const count = await Rating.count({
        where: { iemId: iemId }
      })
      averageRating = Number.parseFloat(sum / count).toFixed(1)

      res.send({
        averageRating: averageRating
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error fetching average rating'
      })
    }
  },

  // create or update rating for a certain IEM
  async put(req, res) {
    try {
      const userId = req.user.id
      const { iemId } = req.body

      const ratingExists = await Rating.findOne({
        where: {
          userId: userId,
          iemId: iemId
        }
      })
      if (!ratingExists) {
        await Rating.create({
          ...req.body,
          userId: userId
        })
        return res.send(req.body)
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
        error: 'Error updating rating'
      })
    }
  },

  // delete rating of a certain IEM
  async remove(req, res) {
    try {
      const { iemId } = req.params
      await Rating.destroy({
        where: { iemId: iemId }
      })

      res.send({
        iemId: iemId
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error deleting rating'
      })
    }
  }
}
