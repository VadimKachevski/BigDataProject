const express = require('express');
const app = express();
var server = require('http').createServer(app);
const port = 3006
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const kafkaCons = require('./kafkaConsume')
const redisSender = require('./RedisForArielSender')
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origin: "*",
    }
  });

var globalSocket;

function getSocket() {
    return globalSocket;
}
function setSocket(sock) {
    if (undefined == globalSocket) globalSocket = sock;
}


io.on("connection",socket =>{
    console.log("new client");
    setSocket(socket)
    
    socket.on("firstLoad",(msg)=>{
        redisSender.GetCarAmount();
    })
    socket.on("getCarsBySectionID",(msg)=>{
      redisSender.GetCarsBySectionID(msg)
    })
    socket.on('disconnect', () => {
      console.log("disc")
    socket.removeAllListeners();
   });
})


server.listen(port, () => console.log(`Redis app listening at http://localhost:${port}`));


module.exports.getScoketFunction = getSocket;
module.exports.SocketIoServer = io;