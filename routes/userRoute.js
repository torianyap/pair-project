const route = require('express').Router()
const UserController = require('../controllers/user')

route.get('/register', UserController.formRegister)
route.post('/register', UserController.addUser)

route.get('/login', UserController.formLogin)
route.post('/login', UserController.login)

route.get('/logout', UserController.logout)

module.exports = route