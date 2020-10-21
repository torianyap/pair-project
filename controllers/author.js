const {Author, Book, User, UserBook} = require('../models')

class AuthorController {
    static listAll (req, res) {
        const alert = req.query.alert
        const username = req.session.username

        Author.findAll({
            include: Book
        })
        .then(data => {
            res.render('./authors/list', {alert, username, data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = AuthorController