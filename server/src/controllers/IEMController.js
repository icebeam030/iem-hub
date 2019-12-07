const Sequelize = require('sequelize')
const { Iem } = require('../models')

const Op = Sequelize.Op

module.exports = {
  // if user is searching, send back search result
  // otherwise send back all IEMs
  async index(req, res) {
    let iems = null
    const search = req.query.search

    try {
      if (search) {
        iems = await Iem.findAll({
          where: {
            [Op.or]: ['brand', 'name'].map((key) => ({
              [key]: { [Op.like]: `%${search}%` }
            }))
          }
        })
      } else {
        iems = await Iem.findAll()
      }

      iems = iems.map((iem) => ({
        id: iem.id,
        brand: iem.brand,
        name: iem.name,
        price: iem.price,
        imageUrl: iem.imageUrl
      }))

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
      let iem = await Iem.findByPk(req.params.iemId)
      iem = {
        id: iem.id,
        brand: iem.brand,
        name: iem.name,
        price: iem.price,
        imageUrl: iem.imageUrl
      }

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
      let iem = await Iem.create(req.body)
      iem = {
        id: iem.id,
        brand: iem.brand,
        name: iem.name,
        price: iem.price,
        imageUrl: iem.imageUrl
      }

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
      await Iem.update(req.body, {
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
    const { iemId } = req.params
    try {
      await Iem.destroy({
        where: { id: iemId }
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
