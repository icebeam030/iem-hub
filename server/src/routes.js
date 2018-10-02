const AuthenticationController = require('./controllers/AuthenticationController')
const IEMController = require('./controllers/IEMController')

// handle various endpoints
module.exports = (app) => {
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/iems', IEMController.index)
  app.post('/iems', IEMController.post)
}
