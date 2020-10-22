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
        const alert = req.query.alert
        const username = req.session.username
        const author = req.session.author
        Author.findAll()
            .then(data => {
                res.render('./books/formAdd', {username, author, data, alert})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addBookPost(req,res){
        const newBook = {
            title :req.body.title,
            genre :req.body.genre,
            released_year :req.body.released_year,
            url: req.body.url,
            AuthorId : req.body.AuthorId
        }

            Book.create(newBook)
            .then(data => {
                res.redirect('/books')
            })
            .catch(err=> {
                if(err.errors){
                    const alert = err.errors.map(element => {
                        return element.message
                    })
                    res.redirect(`/books/add?alert=${alert}`)
                }else{
                    res.send(err)
                } 
            })
    }
    
    static editForm(req,res){
        const alert = req.query.alert
        const username = req.session.username
        const author = req.session.author
        let book 
        const id = +req.params.id
        Book.findByPk(id, {
            include : Author
        })
        .then(result => {
            book=result
            return Author.findAll()
        })
       
        .then(data => {
            res.render('../views/books/edit.ejs', {data, username, author, book, alert})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static edit(req, res){
        const id = +req.params.id
        const value = {
            title : req.body.title,
            genre : req.body.genre,
            url: req.body.url,
            released_year :req.body.released_year,
            AuthorId : req.body.AuthorId,
        }
            Book.update(value, {
                where: {
                    id: id
                }
            })
            .then(data =>{
                res.redirect('/books')
            })
            .catch(err=> {
                if(err.errors){
                    const alert = err.errors.map(element => {
                        return element.message
                    })
                    res.redirect(`/books/${id}/edit?alert=${alert}`)
                }else{
                    res.send(err)
                } 
            })
    }

    static delete (req,res){
        Book.destroy ({
            where : {
                id:+req.params.id
            }
        })
        .then(data => {
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = BookController