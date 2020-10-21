const route = require('express').Router()
const BookController = require('../controllers/book')
const checkAuthor = require('../middleware/checkAuthor')

route.get('/', BookController.listBooks)
route.get('/add', checkAuthor, BookController.addBook)

module.exports = route