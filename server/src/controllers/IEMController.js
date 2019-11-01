const Sequelize = require('sequelize')
const { IEM } = require('../models')

const Op = Sequelize.Op

module.exports = {
  async index(req, res) {
    try {
      let iems = null
      const search = req.query.search
      // if user is searching, send back search result
      // otherwise send back all IEMs
      if (search) {
        iems = await IEM.findAll({
          where: {
            [Op.or]: ['brand', 'name'].map((key) => ({
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
        error: 'Error fetching IEMs'
      })
    }
  },
  // fetch information of a certain IEM from database
  async show(req, res) {
    try {
      const iem = await IEM.findByPk(req.params.iemId)
      res.send(iem)
    } catch (err) {
      res.status(500).send({
        error: 'Error fetching IEM info'
      })
    }
  },
  // post an IEM into database
  async post(req, res) {
    try {
      const iem = await IEM.create(req.body)
      res.send(iem)
    } catch (err) {
      res.status(500).send({
        error: 'Error creating IEM'
      })
    }
  },
  // update information for a certain IEM
  async put(req, res) {
    try {
      await IEM.update(req.body, {
        where: { id: req.params.iemId }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Error updating IEM info'
      })
    }
  },
  // delete a certain IEM
  async remove(req, res) {
    try {
      const { iemId } = req.params
      await IEM.destroy({
        where: {
          id: iemId
        }
      })
      res.send({
        iemId: iemId
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error deleting IEM'
      })
    }
  }
}
