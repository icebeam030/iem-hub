// the server

const express = require('express')
const bodyParser = require('body-parser')
// this should only be used for development due to security issues
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

// use sequelize.sync({ force: true }) to clear the database
sequelize.sync({ force: true })
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
