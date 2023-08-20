
const { model } = require('mongoose')
const messageModel = require('./messages.model')


async function addMessage(infoMessage){
    try {
        console.log(infoMessage);
        // const informacionMessage = {...infoMessage, date: new Date()}
        const message = (await messageModel.create(infoMessage)).populate('user')
        // console.log('message lado servidor', message);
        return message
    } catch (error) {
        return [false, error]
    }
}

async function getMessages(){
    try {
        const messages = await messageModel.find().populate('user')
        return messages
    } catch (error) {
        console.log('error l27',error);
    }
}

async function getIdMessage(id){
    try {
        const message = await messageModel.find({_id  : id}).populate('user')
        // console.log(message); 
        return message
    } catch (error) {
     console.log(error.message); 
     return false
    }
}

async function getMessagesByUser(user){
try {
    const messages = await messageModel.find({user : user}).populate('user')
    return messages
} catch (error) {
    console.log(error);
}
}

async function getMessagesByChat(chat){
    try {
        const messages = await messageModel.find({chat : chat}).populate('user')
        return messages
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getMessagesByChat,
    addMessage,
    getMessages,
    getIdMessage,
    getMessagesByUser
}