const bcrypt = require('bcrypt')
const {Author, Book, User, UserBook} = require('../models')
const transporter = require('../helper/nodemailer')

class UserController {
    static formRegister (req, res) {
        const alert = req.query.alert || null
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
            req.session.username = obj.username
            res.redirect('/books')
        })
        .catch(err => {
            if (err.errors) {
                const problems = err.errors.map(el => el.message)
                res.redirect(`/users/register?alert=${problems}`)
            } else {
                res.send(err)
            }
        })
    }

    static formLogin(req, res) {
        const alert = req.query.alert || null
        const username = req.session.username
        const author = req.session.author
        res.render('./user/login', {alert, username, author})
    }

    static login(req, res) {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            const msg = ['username or password is empty']
            res.redirect(`/users/login?alert=${msg}`)

        } else {
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
                        let error = ['password is incorrect']
                        res.redirect(`/users/login?alert=${error}`)
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
                        let error = ['password is incorrect']
                        res.redirect(`/users/login?alert=${error}`)
                    }
                } else {
                    let usernameX = ['username is not found']
                    res.redirect(`/users/login?alert=${usernameX}`)
                }
            })
            .catch(err =>{
                res.send(err)
            })
        }
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
                attributes: ['id', 'UserId', 'BookId', 'borrow_date', 'return_date']
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
        let userbook

        User.findOne({
            where: {
                username: username
            }
        })
        .then(data => {
            user = data

            return UserBook.create({
                UserId: data.id,
                BookId: BookId,
                borrow_date: new Date()
            })
        })
        .then (data2 => {
            userbook= data2

            return Book.update({status: 'borrowed'}, {
                where: {
                    id: BookId
                },
                returning: true
            })
        })
        .then(result => {
            const email = user.email

            var mailOptions = {
                from: 'toriany6@gmail.com',
                to: email,
                subject: 'You just borrowed a book',
                text: `Hi ${email}, you just borrowed ${result[1][0].title} from our library on ${userbook.borrow_date} please return it within a month, happy reading!`
              };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            res.redirect(`/users/${username}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static return(req, res) {
        const username = req.params.username
        const id = +req.params.id

        UserBook.update({return_date: new Date()}, {
            where: {
                id: id
            },
            returning: true
        })
        .then(result => {
            return Book.update({status: null}, {
                where: {
                    id: result[1][0].BookId
                },
                returning: true
            })
        })
        .then(data => {
            res.redirect(`/users/${username}`)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
}

module.exports = UserController