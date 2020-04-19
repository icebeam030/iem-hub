const Promise = require('bluebird')

const { sequelize, Iem } = require('../models')
const iems = require('./iems.json')

// set force to true to clear the database
sequelize.sync({ force: true })
  .then(async () => {
    // this block can be repeated to populate different tables
    // but don't create users table because password will be unmatched
    await Promise.all(
      iems.map(iem => Iem.create(iem))
    )
  })
