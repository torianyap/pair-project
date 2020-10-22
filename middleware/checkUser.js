function checkUser(req, res, next) {
    if (req.session.username) {
        next()
    } else {
        const alert = ['Please Login first']
        res.redirect(`/users/login?alert=${alert}`)
    }
}
module.exports = checkUser