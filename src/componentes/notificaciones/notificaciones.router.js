
const { Router } = require('express')
const controller = require('./notificaciones.controller')

const route = Router()




route.get('/', async(req, res, next) => {
    try {
        const notificaciones = await controller.getNotis()
        res.json({ ok : true, notificaciones})
    } catch (error) {
        next(error)
    }
})
route.get('/getAlarmas/:arrayIDS', async (req, res, next) => {
    try {
        const { arrayIDS } = req.params
        const arrayIDSii = arrayIDS.split(',')

        const notificaciones = await controller.getNotiById(arrayIDSii)
        res.json({ok : true, notificaciones})
        // return res.json({ok : true})
    } catch (error) {
        next(error)
    }
})
route.post('/', async (req, res, next) => {
    try {
        const notificacion = req.body
        const newNoti = await controller.addNoti(notificacion)
        // verificar que no devuelva error.
        res.json( { ok : true, notificacion : newNoti } )
    } catch (error) {
        next(error)
    }
})









module.exports = route