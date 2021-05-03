
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

module.exports = function (req, res, next) {
    const token = req.headers('Authorization')
    if(!token){
        return res.status(200).json({
            message: 'un authorized user'
        })
    }

    const verified = jwt.verify(token, secretKey)

    req.user = verified
    next()
}