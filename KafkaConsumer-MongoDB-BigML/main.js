const express = require('express');
const app = express();
var server = require('http').createServer(app);
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const kafkaCons = require('./Controller/KafkaController')
const BigMLHandler = require('./Controller/BigMLController')

const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origin: "*",
    }
  });


io.on("connection",socket =>{
    console.log("new client");
    socket.on("startListen",(msg)=>{
        BigMLHandler.startUpdating(socket,io,msg)
    })
    socket.on('disconnect', () => {
      socket.removeAllListeners();
   });
})



server.listen(port, () => console.log(`MongoConsumer app listening at http://localhost:${port}`));