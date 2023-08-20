

const notificacionesModel = require('./notificaciones.model')



async function getNotis(){
    try {
        const notis = await notificacionesModel.find({})
        return notis
    } catch (error) {
        console.log(error);
    }
}


async function addNoti(notificacion){
    console.log(notificacion);
    try {
        const newNoti = await notificacionesModel.create(notificacion)
        return newNoti
    } catch (error) {
        console.log(error);
        return [false, error.message]
    }
}


async function getNotiById(ids){
    try {
        const notis = await notificacionesModel.find({_id: { $in: ids }})
        return notis
    } catch (error) {
        return[false, error.message]
    }
}








module.exports = {
    getNotis,
    addNoti,
    getNotiById
}