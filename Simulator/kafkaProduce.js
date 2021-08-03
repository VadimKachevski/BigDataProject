// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "simulator",
  "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,	glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "bgrfctu2",
  "sasl.password": "WcaT1C5nGTZzPE5UveYIaZmQsrBc_1hS",
  "debug": "generic,broker,security"
};

const prefix = "bgrfctu2-";
const topic = `${prefix}bigData`;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`simulator producer is ready.`);
});
producer.connect();



module.exports.publish= function(msg)
{   
  var arrNew = []
  var arrEdit = []
  msg.forEach(function(value,key,map){
    if(value.eventType == "enterHighway")
    {
      var newval = JSON.parse(JSON.stringify(value))
      delete newval.outSection
      arrNew.push(newval)
    }
    else{
      var newval = JSON.parse(JSON.stringify(value))
      delete newval.outSection
      arrEdit.push(newval)
    }
  });
  
  var m=JSON.stringify([arrNew,arrEdit]);
  //console.log(m)
  producer.produce(topic, -1, Buffer.from(m, "utf-8"), uuid.v4());  
  console.log("producted")
  //producer.disconnect();   
}