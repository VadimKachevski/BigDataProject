
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongodbuser:6LDoN6MxOr1sEVky@cluster0.kdgwy.mongodb.net/testDB?retryWrites=true&w=majority";


function createNewWriteObj(caruuid, update) {
    return {
        updateOne: {
            filter: { carduuid: caruuid },
            update: { $set: { outSection: update } }
        }
    }
}
function createNewFindObj(caruuid) {
    return { carduuid: caruuid }
}

var Db = {
    CreateOrder: function (carObject) {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("testDB");
            const result = dbo.collection("testCol").insertMany(carObject, function (err, res) {
                if (err) throw err;
                db.close();
                console.log(`${res.insertedCount} documents were inserted`);
                return true;
            });
        });

    },
    UpdateOutSection: async function (carObjects, startListen) {
        if (carObjects.length > 0) {
            const db = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            var dbo = db.db("testDB");
            var bulkUpdate = []
            for (let i = 0; i < carObjects.length; i++) {
                bulkUpdate.push(createNewWriteObj(carObjects[i].carduuid, carObjects[i].inSection))
            }
            const bwrite = await dbo.collection("testCol").bulkWrite(bulkUpdate, { "ordered": true })
            console.log(`${bwrite.nModified} documents were modified`);
            if (startListen) {
                // console.log(carObjects)
                const x = await Db.FindAllOrdersById(carObjects)
                db.close();
                return x;
            }
            db.close();
        }
    },

    DeleteOrder: function (info) {
        console.log('Delete Order: ' + info);
    },
    UpdateOrder: function (info) {
        console.log('Update Order ' + info);
    },
    ReadOrders: function () {
        var sum = 0;
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("testDB");
            dbo.collection("testCol").find().toArray(function (err, result) {
                if (err) throw err;
                db.close();
            });
        });

    },
    FindAllOrdersById: async function (arrayOfObject) {
        if (arrayOfObject.length > 0) {
            var arrToFind = [];
            const db = await MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
            var dbo = db.db("testDB");
            for (let i = 0; i < arrayOfObject.length; i++) {
                arrToFind.push(createNewFindObj(arrayOfObject[i].carduuid))
            }
            const x = await dbo.collection("testCol").find({ $or: arrToFind }).toArray()
            db.close();
            return x
        }
    }
};

module.exports = Db