import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5000"],
        methods: ["GET", "POST"]
    }
})

const userSocketMap = {} //{userId:socket.id}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on('connection', (socket)=> {
    console.log("a user connected", socket.id)
    // console.log("a user connected", socket.handshake.query.userId, socket.id)

    const userId = socket.handshake.query.userId
    const username = socket.handshake.query.username
    if(userId != "undefined") userSocketMap[userId] = socket.id
    if(username != "undefined") console.log(username, 'connected')

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    //socket.on is used to listen to events. can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
        delete userSocketMap[userId] //deleted user id from list of online users when user is disconnected

        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export { app, io, server }