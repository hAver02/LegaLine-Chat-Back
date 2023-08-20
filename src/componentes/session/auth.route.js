const { Router } = require('express')
const bycrypt = require('bcryptjs')
const controller = require('../usuarios/user.controller')
const { createTokenJWT } = require('../../utils/jwt')
const jwt = require('jsonwebtoken')

const route = Router()

route.post('/register', async (req, res) => {
    try {
        const { email, nombre, password } = req.body
        
        const hashPass = await bycrypt.hash(password, 10)
    
        const user = await controller.createUser({ email, nombre, password : hashPass })
        console.log(user);
        if (Array.isArray(user)) return res.json({ok : false, message : user[1]})
        if(!user) return res.json({ok : false, error : 'error create suser'})
        const token = await createTokenJWT(user.id)
        // console.log('token', token);
    
        res.cookie('token', token)
        res.json({ ok : true, userID :  user._id })
    
    
    } catch (error) {
        console.log(error);
    }
})

route.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body

        const user = await controller.getByEmail(email)
        // console.log(user);
        if(!user || (Array.isArray(user) && !user[0])) return res.json({ok : false, message : 'Email not found'})

        const validPass = await bycrypt.compare(password, user.password)
        // console.log(validPass);
        if(!validPass) return res.json({ok : false, message : 'invalid password'})

        const token = await createTokenJWT(user._id)
        // console.log(token);
        
        res.cookie('token', token)

        res.json({ ok : true, userID : user._id })


    } catch (error) {
        res.json( { ok : false, message : error} )
    }
})

route.post('/logout', async (req, res) => {
    res.cookie('token', '', {expires : new Date(0)})
    res.send('eliminado')
})

route.post('/validateToken', async(req, res) => {
    const { token } = req.body
    // console.log(token);
    if(!token) return false
    try {
        const validate = jwt.verify(token, 'SECRET-TOKEN', async (error, user) => {
            // const data = user.json()
            // console.log(data);
            if(error) return res.json({ ok : false, message : error.stack })
            // console.log('user', user);
            const userFound = await controller.getById(user.id)
            // console.log(userFound);
            if(!userFound) return res.json({ ok : false, message : 'user not found'})

            res.json( {ok : true, id : user.id} )
        })
        // console.log(validate);
    } catch (error) {
        console.log(error);
    }
})


module.exports = route