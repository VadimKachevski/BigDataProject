// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const Kafka = require("node-rdkafka");

// const redisReciver = require('./RedisForArielReciver')
const redisSender = require('./RedisForArielSender')

const kafkaConf = {
  "group.id": "redisGroup",
  "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "bgrfctu2",
  "sasl.password": "WcaT1C5nGTZzPE5UveYIaZmQsrBc_1hS",
  "debug": "generic,broker,security"
};

const prefix = "bgrfctu2-";
const topic = `${prefix}bigData`;
const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
  console.log("Consumer start")
  console.log(m.value.toString())
  try{
  const obj = JSON.parse(m.value.toString());
  redisSender.PutToRedis(obj)
  }
  catch(error){
    console.log("XD")
  }
  //console.log(m.value.toString())
  
  // redisSender.GetCarTypeAmount()
  //TODO
  console.log("Consumer Done")
});
consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  //console.log(log);
});

consumer.connect();