const route = require('express').Router()
const BookController = require('../controllers/book')

route.get('/', BookController.listBooks)
route.get('/add', BookController.addBook)

module.exports = route