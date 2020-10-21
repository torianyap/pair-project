const checkAuthor = (req, res, next) => {
    if (req.session.author) {
        next()
    } else {
        res.send('You are not authorized')
    }
}

module.exports = checkAuthor