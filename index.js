const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
  
  global.onlineUsers = new Map()
  io.on('connection', (socket) => {
    global.chatsocket = socket
    socket.on('addUser', (id) =>{
        onlineUsers.set(id, socket.id)
    })

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
  })

  server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
  });