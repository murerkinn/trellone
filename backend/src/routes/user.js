const express = require('express')
var router = express.Router()
const passport = require('passport')

const userController = require('../controllers/user')

const preventLoginForLoggedInUsers = (req, res, next) => {
  next(req.user && new Error('User is already logged in'))
}

router.post('/register', userController.register)

router.post(
  '/session',
  preventLoginForLoggedInUsers,
  passport.authenticate('local', { failWithError: true }),
  userController.login,
  (err, req, res, next) => {
    if (err.status != 401) return next(err)

    next(
      new Error('The username and password you provided did not match our records. Please double-check and try again.')
    )
  }
)

router.get('/session', userController.checkLoggedIn)

router.delete('/session', userController.logout)

module.exports = router
