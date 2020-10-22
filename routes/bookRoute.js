const route = require('express').Router()
const BookController = require('../controllers/book')

route.get('/', BookController.listBooks)
route.get('/add', BookController.addBook)
route.post('/add', BookController.addBookPost)
route.get('/:id/delete', BookController.delete)
route.get('/:id/edit', BookController.editForm)
route.post('/:id/edit', BookController.edit)

module.exports = route