// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

// const bigml = require("bigml");
// const Parserjsoncsv = require('json2csv');
// const fs = require('fs');
// const connectionBigml = new bigml.BigML('VADIMKACHE', '9511b55023fc04753b4ad0599992e15a125a4248')
// const bigmlModel = new bigml.Model(connectionBigml)





// const Kafka = require("node-rdkafka");


// const dataModel = require('./Controller/MongoController');



// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// const kafkaConf = {
//   "group.id": "mongoandBigml",
//   "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "bgrfctu2",
//   "sasl.password": "WcaT1C5nGTZzPE5UveYIaZmQsrBc_1hS",
//   "debug": "generic,broker,security"
// };

// const prefix = "bgrfctu2-";
// const topic = `${prefix}bigData`;
// const topics = [topic];
// const consumer = new Kafka.KafkaConsumer(kafkaConf, {
//   "auto.offset.reset": "beginning"
// });

var startListen = false;
var socket;
var io;
var tableFromUser;
function startUpdating(s, i, t) {
  console.log("start")
  startListen = true;
  tableFromUser = t
  socket = s
  io = i
  // console.log(tableFromUser)
}

// consumer.on("error", function (err) {
//   console.error(err);
// });


// consumer.on("ready", function (arg) {
//   console.log(`Consumer ${arg.name} ready`);
//   consumer.subscribe(topics);
//   setInterval(function () {
//     consumer.consume(1);
//   }, 1500);
// });

// consumer.on("data", async function (m) {
//   console.log("Consumer start")
//   try {
//     //console.log(m)
//     const obj = JSON.parse(m.value.toString());
//     const fields = ['inSection', 'carType', 'day', 'hour'];
//     const opts = { fields };
//     const parserofjson = new Parserjsoncsv.Parser(opts);
//     const csvfile = parserofjson.parse(obj[0])
//     await fs.writeFile("test.csv", csvfile, function (err) {
//       if (err) {
//         console.log("ERROR" + err);
//       }
//       //console.log("done")
//       var source = new bigml.Source(connectionBigml);
//       source.create('./test.csv', function (error, sourceInfo) {
//         if (error) { throw error }
//         // console.log("created")
//         if (!error && sourceInfo) {
//           var dataset = new bigml.Dataset(connectionBigml);
//           dataset.create(sourceInfo, function (error, datasetInfo) {
//             if (error) { throw error }
//             if (!error && datasetInfo) {
//               bigmlModel.get('model/60f485085e269e0554013e24', function (error, resource) { //TODO model on starting server
//                 var prediction = new bigml.BatchPrediction(connectionBigml);
//                 prediction.create(resource, datasetInfo, 0, 0, async function (error, Predictresource) {
//                   //console.log(resource)
//                   if (error) { throw error }
//                   var isitDone = false
//                   while (!isitDone) {
//                     //console.log("while")
//                     prediction.get(Predictresource.resource, function (error, pred) {
//                       if (error) { throw error }
//                       //console.log("get")
//                       if (pred.object.status.code == 5) {
//                         //console.log("code=5")
//                         isitDone = true
//                       }
//                     })
//                     await sleep(1000);
//                     //await setTimeout(() => {},1000)
//                   }
//                   prediction.download(Predictresource.resource, Predictresource.resource + ".csv", async function (error, pred) {
//                     if (error) { throw error }
//                     // console.log(pred)
//                     try {
//                       const data = fs.readFileSync(pred, 'utf8')
//                       var arr = data.split("\n")
//                       var x = 1
//                       for (const key in obj[0]) {
//                         obj[0][key].pred = Math.round(parseFloat(arr[x]))
//                         x += 1
//                       }
//                       //console.log(obj[0])
//                       var bool = await dataModel.CreateOrder(obj[0])
//                       var arrToUpdate = []
//                       for (const key in obj[1]) {
//                         if (obj[1][key].eventType == "ExitHighway") {
//                           arrToUpdate.push(obj[1][key])
//                         }
//                       }
//                       if (arrToUpdate.length > 0) {
//                         console.log("-------------------------")
//                         const updatedCars = await dataModel.UpdateOutSection(arrToUpdate, startListen)
//                         if(startListen){                        
//                           //var tableToUpdate = []
//                           for(let i=0;i<updatedCars.length;i++)
//                           {
//                             var outSec = updatedCars[i].outSection 
//                             var predSec = updatedCars[i].pred 
//                             console.log("outSec: " + outSec + " predSec: "+predSec);
//                             tableFromUser[outSec][predSec]++;
//                             //tableToUpdate.push({pred:predSec,out:outSec})
                            
//                           }
//                           io.sockets.emit("change_data", tableFromUser);
//                         }
//                         console.log("-------------------------")
//                       }

//                       // .then(async ()=>{
//                       //   if (startListen) {
//                       //     const oldCarObject = await dataModel.FindAllOrdersById(arrToUpdate)
//                       //     console.log("-------------------------")
//                       //     console.log(oldCarObject)
//                       //     console.log("-------------------------")
//                       // console.log("listen")
//                       // console.log(obj[1][key])
//                       // var inSec = obj[1][key].inSection // outsection
//                       // var outSec = obj[1][key].pred //////////////////TODO FIND IN DB
//                       // console.log("outSection:" + inSec + " Pred:" + outSec)
//                       // for (var [keyObj, value] of Object.entries(data[inSec])) {
//                       //   //console.log(`${key}: ${value}`);
//                       //   if (keyObj == outSec.toString()) {
//                       //     console.log("CHANGED FROM:" + value)
//                       //     value = outSec
//                       //     console.log("TO:" + value)
//                       //   }

//                       //data[inSec].outSec = data[inSec].outSec
                      
//                       //   }
//                       // })

//                       //cleanup
//                       fs.unlink(Predictresource.resource + ".csv", (err) => {
//                         if (err) {
//                           throw err
//                         }
//                       })
//                       source.delete(sourceInfo, function (error, ans) {
//                         if (error) { throw error }
//                         //console.log(ans)
//                       })
//                       dataset.delete(datasetInfo, function (error, ans) {
//                         if (error) { throw error }
//                         //console.log(ans)
//                       })
//                       prediction.delete(Predictresource.resource, function (error, ans) {
//                         if (error) { throw error }
//                         //console.log(ans)
//                       })
//                     }
//                     catch (err) {
//                       console.error(err)
//                     }
//                   })
//                 })
//               })
//             }
//           })
//         }
//       })
//     });

//   }
//   catch (err) {
//     console.error(err)
//   }
//   //dataModel.CreateOrder()
//   console.log("Consumer Done")
// });



// consumer.on("disconnected", function (arg) {
//   process.exit();
// });
// consumer.on('event.error', function (err) {
//   console.error(err);
//   process.exit(1);
// });
// consumer.on('event.log', function (log) {
//   //console.log(log);
// });
// consumer.connect();


// module.exports.startUpdating = startUpdating