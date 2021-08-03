var redis = require('redis');
var redisClient = redis.createClient(3005);
var socketIoHandler = require('./main')
redisClient.subscribe('message'); 



redisClient.on("message", function (channel, data) {
    console.log(data)
    var sock = socketIoHandler.getScoketFunction()
    
    //var data = JSON.parse(data);
    // do things with the data
    // data.variable1 = 3;
    // data.variable2 = "hello";
    // console.log(data.message);

});

redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});

