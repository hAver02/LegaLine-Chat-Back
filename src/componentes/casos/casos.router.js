
const { Router } = require('express')
const controller = require('./casos.controller')
const userController = require('../usuarios/user.controller')
const route = Router()
const { validatorError } = require('../../middleware/error.handler')
const { validateToken } = require('../../middleware/validatorJWT')

route.get('/', async (req, res, next) => {
    try {
        const casos = await controller.getCasos()
        if(validatorError(casos)){
            const err = casos[1]
            next(err)
        }
        res.json({
            ok : true,
            casos
        })
    } catch (error) {
        next(error)
    }
})

route.post('/', validateToken, async (req, res, next) => {
    try {
        // console.log('id user', req.userID);
        const {caso, userChats} = req.body
        // caso.users = [req.userID]
        const addCaso = await controller.addCaso(caso, req.userID, userChats)
        if(validatorError(addCaso)){
            const err = addCaso[1]
            next(err)
        }else{
            const { _id } = addCaso
            const addCase = await userController.addCase(_id.toString(), req.userID)
            if(userChats.length > 0){
                console.log('entramos');
                userChats.map(async (id) => (
                    await userController.addCase(_id.toString(), id)
                ))

            }
            return res.json({
                ok : true,
                message : 'caso agregado correctamente'
            })  
        }
    } catch (error) {
        next(error)
    }
})

route.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const caso = await controller.getCasoById(id)
        if(validatorError(caso)){
            const err = caso[1]
            next(err)
        }
        res.json({ok : true, caso})
    } catch (error) {
        next(error)
    }
})

route.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body
        console.log(id, body);
        const updated = await controller.updatedCase(id, body)
        if(validatorError(updated)){
            const err = caso[1]
            next(err)
        }
        res.json({ ok : true, message : 'case updated succesfully'})
    } catch (error) {
        next(error)
    }
})


// Agregar y sacar periodos trabajados

route.put('/addPeriodWorked/:idCase', async (req, res, next) => {
    try {
        const body = req.body
        const { idCase } = req.params
        periodWorked = {
            lugar : body.lugar,
            desde : new Date(body.desde),
            hasta : new Date(body.hasta)
        }
        console.log(periodWorked);
        const updated = await controller.addPeriodWorked(idCase, periodWorked)
        // console.log('updated,' , updated);
        if(validatorError(updated)){
            const err = updated[1]
            next(err)
        }
        res.json({ ok : true, message : 'period worked updated sucesfully'})
    } catch (error) {
        next(error)
    }
})

route.put('/deletedPeriodWorked/:idCase/:idPeriod', async(req, res, next) => {
    try {
        const { idCase, idPeriod } = req.params 
        const updated = await controller.deletePeriodWorked(idCase, idPeriod)
        if(validatorError(updated)){
            const err = updated[1]
            next(err)
        }
        res.json({ ok : false, message : 'period worked deleted sucesfully' })
    }catch (error) {
        next(error)
    }
})

route.put('/addAlarma/:idCase/:idNotificacion', async (req, res, next) => {
    try {
        const { idCase, idNotificacion } = req.params
        const addAlarm = await controller.addAlarma(idCase, idNotificacion)
        if(validatorError(addAlarm)){
            const err = updated[1]
            next(err)
        }
        return res.json({ ok : true, message : 'alarm added succesfully' })
    } catch (error) {
        next(error.message)
    }
})










module.exports = route