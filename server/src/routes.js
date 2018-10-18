const AuthenticationController = require('./controllers/AuthenticationController')
const IEMController = require('./controllers/IEMController')
const RatingController = require('./controllers/RatingController')

// define functions to handle various endpoints
module.exports = (app) => {
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/iems', IEMController.index)
  app.get('/iems/:iemId', IEMController.show)
  app.post('/iems', IEMController.post)
  app.put('/iems/:iemId', IEMController.put)
  app.delete('/iems/:iemId', IEMController.remove)

  app.get('/ratings', RatingController.index)
  app.get('/ratings/:iemId', RatingController.show)
  app.put('/ratings', RatingController.put)
  app.delete('/ratings/:iemId', RatingController.remove)
}
