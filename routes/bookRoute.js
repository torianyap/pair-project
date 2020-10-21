const route = require('express').Router()
const BookController = require('../controllers/book')

route.get('/', BookController.listBooks)

module.exports = route