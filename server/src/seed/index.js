const { sequelize, IEM } = require('../models')

const Promise = require('bluebird')
const iems = require('./iems.json')

// use sequelize.sync({ force: true }) to clear the database
sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      iems.map(iem => {
        IEM.create(iem)
      })
    )
  })
