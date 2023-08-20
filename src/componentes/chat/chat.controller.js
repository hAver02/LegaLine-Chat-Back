

const chatModel = require('./chat.model')

async function addChat(chat){
    try {
        if(chat?.users && Array.isArray(chat.users)){
            const chatt = await chatModel.create(chat)
            // console.log('chaat', chatt);
            return chatt
        }
        return false

    } catch (error) {
        return [false, error]
    }
}

async function getChats(){
    try {
        const chats = await chatModel.find().populate('users')
        return chats
    } catch (error) {
        return [false, error]
    }
}

async function getChat(id){
    try {
        const chat = await chatModel.findOne( { _id : id }).populate('users')
        return chat
    } catch (error) {
        return [false, error]
    }
}

async function addUserToChat(idChat, idUser){
    try {
        const updated = await chatModel.findByIdAndUpdate(idChat, {
            $push : {
                users : idUser
            }
        })
        return updated
    } catch (error) {
        return [false, error]
    }
}

async function deleteUserToChat(idChat, idUser){
    try {
        const updated = await chatModel.findByIdAndUpdate(idChat, {
            $pull : { users : idUser }
        })
        // console.log(updated);
        return updated
    } catch (error) {
        console.log('aca?');
        return [false, error]
    }

}
module.exports = {
    addChat,
    getChat,
    getChats,
    addUserToChat,
    deleteUserToChat
}