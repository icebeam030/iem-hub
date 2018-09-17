const AuthenticationController = require('./controllers/AuthenticationController')

// handle various endpoints
module.exports = (app) => {
  app.post('/register', AuthenticationController.register)

  app.post('/login', AuthenticationController.login)
}
