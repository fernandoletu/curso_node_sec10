const jwt = require('jsonwebtoken')

//JWT creation
const generateJWT = (uid = '')  => {
    return new Promise((resolve, reject) => {
        const payload = {uid}

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '8h',
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('Cannot generate JWT')
            }else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT,
}