const bcrypt = require('bcrypt')
const {Author, Book, User, UserBook} = require('../models')

class UserController {
    static formRegister (req, res) {
        const alert = req.query.alert
        const username = req.session.username
        res.render('./user/register', {alert, username})
    }

    static addUser(req, res) {
        const obj = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.email   
        }
        User.findOne({
            where: {
                username: obj.username
            }
        })
        .then(data => {
            if(data) {
                res.send('username is taken')
            } else {
                return User.create(obj)
            }
        })
        .then(newUser => {
            req.session.username = obj.username
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formLogin(req, res) {
        const alert = req.query.alert
        const username = req.session.username
        const author = req.session.author
        res.render('./user/login', {alert, username, author})
    }

    static login(req, res) {
        const username = req.body.username
        const password = req.body.password

        User.findOne({
            where: {
                username: username
            }
        })
        .then(data => {
            if (!data) {
                return Author.findOne({where: {first_name: username}})
            } else {
                if (bcrypt.compareSync(password, data.password)) {
                    req.session.username = username
                    res.redirect('/books')
                } else {
                    res.send('password is incorrect')
                }
            }
        })
        .then(author => {
            if(author) {
                if (password === author.last_name) {
                    req.session.author = author.first_name
                    console.log(req.session.author)
                    res.redirect('/books')
                } else {
                    res.send('wrong password')
                }
            } else {
                res.send('username is not found')
            }
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = UserController