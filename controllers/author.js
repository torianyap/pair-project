const {Author, Book, User, UserBook} = require('../models')

class AuthorController {
    static listAll (req, res) {
        const username = req.session.username
        const author = req.session.author

        Author.findAll({
            include: Book
        })
        .then(data => {
            res.render('./authors/list', {username, data, author})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = AuthorController