const { validatorError } = require('../../middleware/error.handler')
const { validateToken } = require('../../middleware/validatorJWT')
const { Router } = require('express')
const controller = require('./user.controller')
const { validate } = require('./user.model')
const { isValidObjectId } = require('mongoose')
const route = Router()


route.get('/' ,async (req, res, next) =>{
    try {
        const users = await controller.getUsers()
        if(validatorError(users)){
            const err = users[1]
            next(err)
        }
        res.json( {
            ok : true,
            users
        } )
    } catch (error) {
        next(error)
    }
})

route.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        // const userId = req.userID
        // console.log('userID', id);
        const user = await controller.getById(id)
        // console.log(user);
        if(validatorError(user)){
            const err = user[1]
            next(err)
        }
        if(user){
            return res.json( { ok : true, user : user } )
        }
        res.json({ok : false, message : 'not found user with this id'})
        
    } catch (error) {
        next(error)
    }
})

route.post('/',async (req, res, next) => {
    try {
        const user = req.body
        const created = await controller.createUser(user);
        if(validatorError(created)){
            const err = created[1]
            next(err)
        }
        res.json({ ok : true, user : created})
    } catch (error) {
        next(error)
    }
})

route.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await controller.deleteUser(id)
        if(validatorError(deleted)){
            const err = deleted[1]
            next(err)
        }
        res.json( {ok : true, message : "user deleted succesfully"} )
    } catch (error) {
        next(error)
    }
})

route.put('/:id', async(req, res, next) => {
    const { id } = req.params
    const updateUser = req.body;
    try {
        const update = await controller.updateUser(id, updateUser)
        if(validatorError(update)){
            const err = update[1]
            next(err)
        }
        res.json({ok : true, message : 'user updated succesfully'})
    } catch (error) {
        next(error)
    }
})

route.put('/addCase/user', async (req, res, next) => {
    const ids = req.body;
    console.log(ids);
    try {
        const update = await controller.addCase(ids.idCase, ids.idUser)
        console.log(update);
        if(validatorError(update)){
            const err = update[1]
            next(err)
        }
        res.json({ ok : true, message : 'case added succesfully' })
    } catch (error) {
        next(error)
    }
}
)

route.put('/deleteCasetToUser', async (req, res, next) => {
    try {
        const { idUser, idCase } = req.body;
        const deleted = await controller.deleteCase(idCase, idUser)
        if(validatorError(deleted)){
            const err = deleted[1]
            next(err)
        }
        res.json( { ok : true, message : 'case deleted succesfully' } )
        
    } catch (error) {
        next(error)
    }
})


route.put('/addFriend/:email', validateToken ,async (req, res, next) => {

    console.log(req.userID);
    try {
        const { email } = req.params
        console.log('email', email);
        const rta = await controller.addAmigo(email, req.userID)
        if(!rta) return res.json({ok : false, message : 'User not found'})
        res.json({ok : true, rta})
    } catch (error) {
        next(error)
    }
})




module.exports = route 