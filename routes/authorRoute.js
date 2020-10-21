const route = require('express').Router()
const AuthorController = require('../controllers/author')

route.get('/', AuthorController.listAll)

module.exports = route