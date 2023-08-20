const { Router } = require('express')
const controller = require('./chat.controller')
const { validatorError, logError } = require('../../middleware/error.handler') 

const route = Router()

route.get('/', async (req, res, next) => {
    try {
        const chats = await controller.getChats()
        if(validatorError(chats)){
            const err = chats[1]
            next(err)
        }
        res.json({ ok : true, chats })
    } catch (error) {
        next(error)
    }
})

route.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const chat = await controller.getChat(id)
        if(validatorError(chat)){
            const err = chat[1]
            next(err)
        }
        res.json({ ok : true, chat })
    } catch (error) {
        next(error)
    }
})

route.post('/', async (req, res, next) => {
    try {
        const users = req.body
        const chat = await controller.addChat(users)
        if(validatorError(chat)){
            const err = chat[1]
            next(err)
        }
        res.json({ ok : true, chat })
    } catch (error) {
        next(error)
    }
})

route.put('/:idChat/addUser/:idUser', async (req, res, next) => {
    try {
        const { idChat, idUser } = req.params
        const updated = await controller.addUserToChat(idChat, idUser)

        if(validatorError(updated)){
            const err = updated[1]
            next(err)
        }

        res.json({ ok: true, message : 'user added succesfully' })

    } catch (error) {
        next(error)
    }
})

route.put('/:idChat/deleteUser/:idUser', async (req, res, next) => {
    try {
        const { idChat, idUser } = req.params;
        // console.log(idChat, idUser);
        const updated = await controller.deleteUserToChat(idChat, idUser)
        console.log(updated);
        if(validatorError(updated)){
            const err = updated[1]
            next(err)
        }

        res.json({ ok : true, message : 'user deleted succesfully from chat'})
    } catch (error) {
        next(error)
    }
})



module.exports = route