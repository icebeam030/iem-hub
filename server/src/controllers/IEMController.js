const { IEM } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  // fetch IEMs from database
  async index (req, res) {
    try {
      let iems = null
      const search = req.query.search
      // if user is searching, send back search result
      // otherwise send back all IEMs
      if (search) {
        iems = await IEM.findAll({
          where: {
            [Op.or]: ['brand', 'name'].map(key => ({
              [key]: { [Op.like]: `%${search}%` }
            }))
          }
        })
      } else {
        iems = await IEM.findAll()
      }
      res.send(iems)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred trying to fetch the IEMs'
      })
    }
  },
  // fetch information of a certain IEM from database
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
  // post an IEM into database
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
  // update information for a certain IEM
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
