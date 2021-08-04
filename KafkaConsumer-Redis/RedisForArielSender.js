var redis = require('redis');
var redisClient = redis.createClient(3005)
var socketIoHandler = require('./main')
// for explanations : https://www.sitepoint.com/using-redis-node-js/

redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});



var redisFunctions = {
    PutToRedis: async function (m){
        //console.log("firstFor")
        for (const key in m[0]){
           await redisClient.hset(m[0][key].inSection, m[0][key].carduuid , JSON.stringify(m[0][key]),(err,reply)=>{ //THINK IF NEED AWAIT
                if(err){
                    throw err;
                }
            })
        }
        for (const key in m[1]){
           await redisClient.hdel(m[1][key].SwitchFrom,m[1][key].carduuid)
           if(m[1][key].eventType=="SwitchToll")
           {
            await redisClient.hset(m[1][key].inSection, m[1][key].carduuid , JSON.stringify(m[1][key]),(err,reply)=>{ //THINK IF NEED AWAIT
                if(err){
                    throw err;
                }
            })
           }
        }
        redisFunctions.GetCarAmount(m[0])
        //redisFunctions.GetCarTypeAmount()
        // redisFunctions.SendNewCarInfomation(m)
        //socketIoHandler.SocketIoServer.sockets.emit("updateSec1","MSG")
        // redisClient.publish("message",JSON.stringify(m), function (err,reply) {
        //     if(err){
        //         throw err;
        //     }
        //     console.log("Published")});
        },
        GetCarAmount: function (m){
            var obj = {}
            var obj2= {"Truck":0,"Bus":0,"Van":0,"Private":0}
             redisClient.keys('*', (err, res)=>{
                for(let i=0;i<6;i++){
                    // redisClient.hlen(i,(errr,res2)=>{
                    //     obj[i]=res2
                    //     if(i==5){
                    //     socketIoHandler.SocketIoServer.sockets.emit("update",JSON.stringify(obj))
                    // }
                    // })
                    redisClient.hgetall(i,(err,res)=>{
                        if(res!= undefined ){
                        obj[i]=(Object.keys(res).length)
                        }
                        for (const key in res){
                            var newobj = JSON.parse(res[key])
                            obj2[newobj.carType]+=1;
                        }
                        if(i==5){
                            var newObj = {"carAmountBySection":obj,"carAmountByType":obj2,"newCars":m}
                            socketIoHandler.SocketIoServer.sockets.emit("updateCar",JSON.stringify(newObj))
                        }
                    })
                }
            });
        },
        GetCarsBySectionID: function (secid){
            redisClient.hgetall(secid,(err,res)=>{
                if(res!= undefined ){
                    var arr = []
                    for (const key in res){
                        var newobj = JSON.parse(res[key])
                        arr.push(newobj)
                    }
                    socketIoHandler.SocketIoServer.sockets.emit("updateCarsBySection",JSON.stringify(arr))
                }
            })
        },
}

module.exports = redisFunctions