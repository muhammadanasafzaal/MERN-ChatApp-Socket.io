import dotenv from 'dotenv'
import connectToDb from './db/connectToDb.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/message.js'
import userRoutes from './routes/user.js'
import { app, server } from './socket/socket.js'
import express from 'express'

dotenv.config();
const PORT = process.env.PORT || 5001

const __dirname = path.resolve()

// app.get("", (req,res) => {
//     res.send("Hello world");
// })

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/user", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, ()=> {
    connectToDb();
    console.log(`Server is running on port ${PORT}`)
} 
);