const express = require('express')
const route = require('./routes')
const session = require('express-session')

const app = express()
const port = 3000 || process.env.PORT

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(route)

app.listen(port, _ => {
    console.log(`listening at http://localhost:${port}`)
})