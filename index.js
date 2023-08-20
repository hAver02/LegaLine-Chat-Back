

const express = require('express');
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const { logError, handleError } = require('./src/middleware/error.handler');
const  { mongoDBconnection } = require('./src/database/mongo.config')
const cookieParser = require('cookie-parser');

const messageRoutes = require('./src/componentes/message/messages.router')
const userRoutes = require('./src/componentes/usuarios/user.router')
const chatRoutes = require('./src/componentes/chat/chat.router')
const casosRoutes = require('./src/componentes/casos/casos.router')
const sessionRoutes = require('./src/componentes/session/auth.route')
const notiRoutes = require('./src/componentes/notificaciones/notificaciones.router')
const controllerMessage = require('./src/componentes/message/messages.controller')

const app = express()
const server = http.createServer(app)



const PORT = 3000
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use(express.urlencoded( { extended : false } ) )

app.use(express.json())

const conectDB = async () => {
    await mongoDBconnection()
}

conectDB()
app.use('/message', messageRoutes)
app.use('/user', userRoutes)
app.use('/session', sessionRoutes)
app.use('/chat', chatRoutes)
app.use('/casos', casosRoutes)
app.use('/notificaciones', notiRoutes)

app.use(logError)
app.use(handleError)

const io = new Server(server, {
    cors: {
        origin : "http://localhost:5173"
    }
})

// console.log('hola')

io.on('connection',  (socket) => {
    console.log('client connected');
    socket.on('message', async (data) => {
        console.log(data);
        const rta = await controllerMessage.addMessage(data)    
        console.log('rtaaa,', rta);
        // VALIDAR RTA
        socket.broadcast.emit('message', rta )

    })
} )

app.use('/', (req, res) => {
    res.status(404).json({
        ok : false,
        message : 'notfound'
    })
})





server.listen(PORT, (req, res) => {
    console.log(`Corriendo por el puerto ${PORT}`);
})