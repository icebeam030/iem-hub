const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // handle the register endpoint
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
}
