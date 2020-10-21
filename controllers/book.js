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
            console.log(req.session)
            res.render('./books/list', {data, username, author})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = BookController