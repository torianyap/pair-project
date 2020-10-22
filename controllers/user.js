const bcrypt = require('bcrypt')
const {Author, Book, User, UserBook} = require('../models')

class UserController {
    static formRegister (req, res) {
        const alert = req.query.alert
        const username = req.session.username
        const author = req.session.author
        res.render('./user/register', {alert, username, author})
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
            console.log(obj)
            req.session.username = obj.username
            console.log(req.session.username)
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
                    req.session.author = author.last_name
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
    
    static history(req, res) {
        const username = req.params.username
        const author = req.session.author
        let user;

        User.findOne({
            where: {
                username: username
            }
        })
        .then(data => {
            user = data
            return UserBook.findAll({
                where: {
                    UserId: data.id
                },
                include: Book,
            })
        })
        .then(result => {
            res.render('user/history', {result, user, username, author})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static borrow(req, res) {
        const username = req.params.username
        const BookId = req.params.BookId
        let user;

        User.findOne({
            where: {
                username: username
            }
        })
        .then(data => {
            user = data
            return UserBook.create({
                UserId: user.id,
                BookId: BookId,
                borrow_date: new Date()
            })
        })
        .then (data2 => {
            return Book.update({status: 'borrowed'}, {
                where: {
                    id: BookId
                }
            })
        })
        .then(result => {
            res.redirect(`/users/${username}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static return(req, res) {
        const username = req.params.username
        const id = req.params.id

        UserBook.update({return_date: new Date()}, {
            where: {
                id: 1
            },
            include: Book
        })
        .then(result => {
            return Book.update({status: 'free'}, {
                where: {
                    id: result.BookId
                }
            })
        })
        .then(data => {
            console.log(data)
            res.redirect(`/users/${username}`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController