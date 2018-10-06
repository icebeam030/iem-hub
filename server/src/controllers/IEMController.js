const { IEM } = require('../models')

module.exports = {
  // fetch the list of iems from the database
  async index (req, res) {
    try {
      const iems = await IEM.findAll({
        where: {}
      })
      res.send(iems)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to fetch the IEMs'
      })
    }
  },
  // fetch a certain iem from the database
  async show (req, res) {
    try {
      const iem = await IEM.findById(req.params.iemId)
      res.send(iem)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to fetch the IEM'
      })
    }
  },
  // post items into the database
  async post (req, res) {
    try {
      const iem = await IEM.create(req.body)
      res.send(iem)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to create the IEM'
      })
    }
  },
  // update information for a certain iem
  async put (req, res) {
    try {
      const iem = await IEM.update(req.body, {
        where: { id: req.params.iemId }
      })
      res.send(iem)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to update IEM information'
      })
    }
  }
}
