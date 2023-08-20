

const jwt = require('jsonwebtoken')


const createTokenJWT = (userID) => {
    return new Promise((resolve, reject) => {
        
        jwt.sign({ id : userID }, 'SECRET-TOKEN', {expiresIn : '1d'}, (err, token) => {
            if(err) reject(err)
            console.log(token);
            resolve(token)
        })
    })

}

module.exports = { createTokenJWT }