const jwt = require('jsonwebtoken')

// we can add this middleware to any protected route
//our middleware => checks if we have token
module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified     // put the userId in request.user
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}