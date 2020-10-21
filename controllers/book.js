const {Author, Book, User, UserBook} = require('../models')

class BookController {
    static listBooks(req, res) {
        Book.findAll({
            include: Author,
            order : [['id', 'asc']]
        })
        .then (data => {
            const username = req.session.username
            const author = req.session.author
            res.render('./books/list', {data, username, author})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static addBook(req, res) {
        const username = req.session.username
        const author = req.session.author
        Author.findAll()
            .then(data => {
                res.render('./books/formAdd', {username, author, data})
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = BookController