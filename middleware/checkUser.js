const checkUser = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.send('You are not login')
    }
}

module.exports = checkUser