const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
//Create http web server ourselves to pass in to socketio, since we can't do it when server is automatically configured with express
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})