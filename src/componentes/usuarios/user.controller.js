

const userModel = require('./user.model')

async function getUsers(){
    try {
        const users = await userModel.find({}).populate('casos')
        return users  
    } catch (error) {
        return [false, error]
    }
}

async function getById(id){
    try {
        const user = await userModel.findById(id).populate('casos').populate('amigos')
        return user
    } catch (error) {
        return [false, error]
    }
}
async function getByEmail (email) {
    try {
        const user = await userModel.findOne({email : email})
        return user
    } catch (error) {
        return [false, error]
    }
}
async function createUser(user){
    try {
        const usuario = await userModel.create(user);
        return usuario
    } catch (error) {
        return [false, error.message]
    }
}

async function deleteUser(id){
    try {
        const deleted = await userModel.findByIdAndDelete(id)
        // console.log(deleted);
        return deleted
    } catch (error) {
        return [false, error]
    }
}

async function updateUser(id, body){
    // console.log(body);
    try {
        const update = await userModel.findOneAndUpdate({ _id : id }, body)
        // console.log(update);
        return update
    } catch (error) { 
        return [false, error]
    }
}

async function addCase(idCase, idUser){
    try {
        const updated = userModel.findByIdAndUpdate(idUser, {
            $push : {
                casos : idCase
            }
        })
        return updated
    } catch (error) {
        return [false, error]
    }
}
async function deleteCase(idCase, idUser){
    try {
        const updated = userModel.findByIdAndUpdate(idUser, {
            $pull : {
                casos : idCase
            }
        })

        return updated
        // console.log(userCasos, newUser);
        return 'holis'
    } catch (error) {
        return [false, error]
    }
}

async function addAmigo(email, idUser){
    try {
        const userFriend = await userModel.findOne({email : email})
        if (userFriend){

            //validar que no este ya como amigo.
            const { _id } = userFriend
            const idAmigo = _id.toString();
            console.log(idAmigo);
            console.log(userFriend);
            const updated = await userModel.findByIdAndUpdate(idUser, {
                    $push : {
                        amigos : idAmigo
                    }
                })
            const updated2 = await userModel.findByIdAndUpdate(idAmigo, {
                    $push : {
                        amigos : idUser
                    }
                })
    
            console.log(updated2);
            return updated
        }
        return false
    } catch (error) {
        console.log(error);
    }
}
async function deleteAmigo(idAmigo, idUser){
    const updated = userModel.findByIdAndUpdate(idUser, {
        $pull : {
            amigos : idAmigo
        }
    })
    const updated2 = userModel.findByIdAndUpdate(idAmigo, {
        $pull : {
            amigos : idUser
        }
    })
    return updated
}
module.exports = {
    getByEmail,
    getUsers,
    createUser,
    addCase,
    getById,
    deleteUser,
    updateUser,
    deleteCase,
    addAmigo,
    deleteAmigo
}