const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next){
    const token = req.header('Auth-token')
    if(!token) return res.status(401).send("You suck! Access denied!")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.token_id = verified
        next()
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}