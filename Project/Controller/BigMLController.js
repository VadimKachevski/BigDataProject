const bigml = require("bigml");
const Parserjsoncsv = require('json2csv');
const fs = require('fs');
const connectionBigml = new bigml.BigML('VADIMKACHE', '9511b55023fc04753b4ad0599992e15a125a4248')
const bigmlModel = new bigml.Model(connectionBigml)



const dataModel = require('./MongoController');

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

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


var BigMLHandler = {
    newBatch: async function (m) {
        try {
            //console.log(m)
            var obj;
            try {
                obj = JSON.parse(m.value.toString());
            }
            catch (err) {
                console.log(m.value.toString())
                throw err;
            }
            const fields = ['inSection', 'carType', 'day', 'hour'];
            const opts = { fields };
            const parserofjson = new Parserjsoncsv.Parser(opts);
            const csvfile = parserofjson.parse(obj[0])
            await fs.writeFile("test.csv", csvfile, function (err) {
                if (err) {
                    console.log("ERROR" + err);
                }
                //console.log("done")
                var source = new bigml.Source(connectionBigml);
                source.create('./test.csv', function (error, sourceInfo) {
                    if (error) { throw error }
                    // console.log("created")
                    if (!error && sourceInfo) {
                        var dataset = new bigml.Dataset(connectionBigml);
                        dataset.create(sourceInfo, function (error, datasetInfo) {
                            if (error) { throw error }
                            if (!error && datasetInfo) {
                                bigmlModel.get('model/60f485085e269e0554013e24', function (error, resource) { //TODO model on starting server
                                    var prediction = new bigml.BatchPrediction(connectionBigml);
                                    prediction.create(resource, datasetInfo, 0, 0, async function (error, Predictresource) {
                                        //console.log(resource)
                                        if (error) { throw error }
                                        var isitDone = false
                                        while (!isitDone) {
                                            //console.log("while")
                                            prediction.get(Predictresource.resource, function (error, pred) {
                                                if (error) { throw error }
                                                //console.log("get")
                                                if (pred.object.status.code == 5) {
                                                    //console.log("code=5")
                                                    isitDone = true
                                                }
                                            })
                                            await sleep(1000);
                                            //await setTimeout(() => {},1000)
                                        }
                                        prediction.download(Predictresource.resource, Predictresource.resource + ".csv", async function (error, pred) {
                                            if (error) { throw error }
                                            // console.log(pred)
                                            try {
                                                const data = fs.readFileSync(pred, 'utf8')
                                                var arr = data.split("\n")
                                                var x = 1
                                                for (const key in obj[0]) {
                                                    obj[0][key].pred = Math.round(parseFloat(arr[x]))
                                                    x += 1
                                                }
                                                //console.log(obj[0])
                                                var bool = await dataModel.CreateOrder(obj[0])
                                                var arrToUpdate = []
                                                for (const key in obj[1]) {
                                                    if (obj[1][key].eventType == "ExitHighway") {
                                                        arrToUpdate.push(obj[1][key])
                                                    }
                                                }
                                                if (arrToUpdate.length > 0) {
                                                    console.log("-------------------------")
                                                    const updatedCars = await dataModel.UpdateOutSection(arrToUpdate, startListen)
                                                    if (startListen) {
                                                        var matrix = new Array(6)
                                                        for (var i = 0; i < 6; i++) {
                                                            matrix[i] = { col: i, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                                                        }
                                                        for (let i = 0; i < updatedCars.length; i++) {
                                                            var outSec = updatedCars[i].outSection
                                                            var predSec = updatedCars[i].pred
                                                            console.log("outSec: " + outSec + " predSec: " + predSec);
                                                            matrix[outSec][predSec]++;
                                                            //tableToUpdate.push({pred:predSec,out:outSec})

                                                        }
                                                        //console.log(matrix)
                                                        io.sockets.emit("change_data", matrix);
                                                    }
                                                    console.log("-------------------------")
                                                }

                                                //cleanup
                                                fs.unlink(Predictresource.resource + ".csv", (err) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                                source.delete(sourceInfo, function (error, ans) {
                                                    if (error) { throw error }
                                                    //console.log(ans)
                                                })
                                                dataset.delete(datasetInfo, function (error, ans) {
                                                    if (error) { throw error }
                                                    //console.log(ans)
                                                })
                                                prediction.delete(Predictresource.resource, function (error, ans) {
                                                    if (error) { throw error }
                                                    //console.log(ans)
                                                })
                                            }
                                            catch (err) {
                                                console.error(err)
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    }
                })
            });

        }
        catch (err) {
            console.error(err)
        }
    }
}

module.exports = BigMLHandler
module.exports.startUpdating = startUpdating