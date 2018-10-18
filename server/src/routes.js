const AuthenticationController = require('./controllers/AuthenticationController')
const IEMController = require('./controllers/IEMController')
const RatingController = require('./controllers/RatingController')
const isUserAuthenticated = require('./passport/isUserAuthenticated')

// define functions to handle various endpoints
module.exports = (app) => {
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/iems', isUserAuthenticated, IEMController.index)
  app.get('/iems/:iemId', isUserAuthenticated, IEMController.show)
  app.post('/iems', isUserAuthenticated, IEMController.post)
  app.put('/iems/:iemId', isUserAuthenticated, IEMController.put)
  app.delete('/iems/:iemId', isUserAuthenticated, IEMController.remove)

  app.get('/ratings', isUserAuthenticated, RatingController.index)
  app.get('/ratings/:iemId', isUserAuthenticated, RatingController.show)
  app.put('/ratings', isUserAuthenticated, RatingController.put)
  app.delete('/ratings/:iemId', isUserAuthenticated, RatingController.remove)
}
