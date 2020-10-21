const {Author, Book, User, UserBook} = require('../models')

class BookController {
    static listBooks(req, res) {
        Book.findAll({
            include: Author,
            order : [['id', 'asc']]
        })
        .then (data => {
            console.log(data)
            res.render('./books/list', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = BookController