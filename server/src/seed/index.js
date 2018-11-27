const { sequelize, IEM } = require('../models')

const Promise = require('bluebird')
const iems = require('./iems.json')

// set force to true to clear the database
sequelize.sync({ force: true })
  .then(async function () {
    // this block can be repeated to populate different tables
    // but don't create users table because password will be unmatched
    await Promise.all(
      iems.map(iem => {
        IEM.create(iem)
      })
    )
  })
