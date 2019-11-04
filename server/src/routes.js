const AuthenticationController = require('./controllers/AuthenticationController')
const IemController = require('./controllers/IemController')
const RatingController = require('./controllers/RatingController')
const isUserAuthenticated = require('./passport/isUserAuthenticated')

// define functions to handle various endpoints
module.exports = (app) => {
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/iems', isUserAuthenticated, IemController.index)
  app.get('/iems/:iemId', isUserAuthenticated, IemController.show)
  app.post('/iems', isUserAuthenticated, IemController.post)
  app.put('/iems/:iemId', isUserAuthenticated, IemController.put)
  app.delete('/iems/:iemId', isUserAuthenticated, IemController.remove)

  app.get('/ratings', isUserAuthenticated, RatingController.index)
  app.get('/ratings/:iemId', isUserAuthenticated, RatingController.show)
  app.put('/ratings', isUserAuthenticated, RatingController.put)
  app.delete('/ratings/:iemId', isUserAuthenticated, RatingController.remove)
}
