const route = require('express').Router()
const bookRoute = require('./bookRoute')
const authorRoute = require('./authorRoute')
const userRoute = require('./userRoute')

route.get('/', (req, res) => {
    res.render('home')
})

route.use('/books', bookRoute)
route.use('/authors', authorRoute)
route.use('/users', userRoute)


module.exports = route