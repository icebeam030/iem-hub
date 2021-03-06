// the server

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// cors should only be used for development due to security issues
const cors = require('cors')

const config = require('./config/config')
const { sequelize } = require('./models')
const routes = require('./routes')
require('./passport/passport')

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

routes(app)

// set force to true to clear the database
sequelize.sync({ force: false })
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
