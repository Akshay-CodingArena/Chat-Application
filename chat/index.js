const express = require('express')
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")



app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("User connected",socket.id)
    socket.on("disconect",()=>{
        console.log("User Disconnected", socket.id)
    })
    socket.on("join_room",(id)=>{
        socket.join(id)
        console.log(`user with id ${socket.id} joined`)
    })
    socket.on("join_chat",(name)=>{
        socket.join("MyRoom")
        console.log(`user with id ${socket.id} joined the chat ${name}`)
    })
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to("MyRoom").emit("receive_message",data)
    })
})
server.listen(3001,()=>{
    console.log("Running the server at 3001")
})
