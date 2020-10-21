const route = require('express').Router()
const bookRoute = require('./bookRoute')
const authorRoute = require('./authorRoute')
const userRoute = require('./userRoute')

route.get('/', (req, res) => {
    const username = req.session.username
    const author = req.session.author
    res.render('home', {username, author})
})

route.use('/books', bookRoute)
route.use('/authors', authorRoute)
route.use('/users', userRoute)


module.exports = route