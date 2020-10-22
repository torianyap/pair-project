const route = require('express').Router()
const UserController = require('../controllers/user')
const checkUser = require('../middleware/checkUser')

route.get('/register', UserController.formRegister)
route.post('/register', UserController.addUser)

route.get('/login', UserController.formLogin)
route.post('/login', UserController.login)

route.get('/logout', UserController.logout)

route.get('/:username', checkUser ,UserController.history)

route.get('/:username/:BookId', checkUser, UserController.borrow)

route.get('/:username/:id/return', checkUser ,UserController.return)

module.exports = route