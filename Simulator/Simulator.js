const express = require('express');
const uuid = require("uuid");
const app = express();
var server = require('http').createServer(app);
const port = 3003

const kafka = require('./kafkaProduce');
const misc = require('./misc')

const carMap = new Map() // 

function simulateNewCar(){
    var randomAmoutOfCars = Math.floor(Math.random() * 8)+2
    //console.log(randomAmoutOfCars)
    for (let i =0 ; i<randomAmoutOfCars;i++)
    {
        var randomDay = Math.floor(Math.random() * 7)+1;
        //console.log("random day " + randomDay)
        var randomHour = Math.floor(Math.random() * 24);
        //console.log("random hour " + randomHour)
        var daymap = misc.dayFunctionHourGetDistArray
        var func = daymap.get(randomDay)
        var randomCarType = Math.floor(Math.random() * misc.carTypeArray.length);
        var randomcartypename = misc.carTypeArray[randomCarType]
        //console.log("random cartype " + randomcartypename)
        var arrinout = func(randomHour,randomcartypename)
        //console.log("from:" + arrinout[0] + " to: " + arrinout[1])
        carid =  uuid.v4()
        var randomColor = Math.floor(Math.random() * misc.colorArray.length);
        var color = misc.colorArray[randomColor]

        var randomBrand = Math.floor(Math.random() * misc.carBrandArray.length);
        var brand = misc.carBrandArray[randomBrand]


        var carObj = {
            carduuid : carid,
            eventType:"enterHighway",
            inSection:arrinout[0],
            outSection:arrinout[1],
            carType :randomcartypename,
            day:misc.daysArray[randomDay-1],
            hour:randomHour,
            color:color,
            brand:brand
        }
        carMap.set(carid,carObj)
        //console.log("Car with uuid "+ carid + " went into the map")
    }
}

function moveCarsOneUp(value,key,map)
{
    // var ranomNumber = Math.floor(Math.random()*3);
    // if(ranomNumber<=1)
    // {
    if(value.eventType == "ExitHighway")
    {
        map.delete(key)
        console.log("Car with uuid "+ value.carduuid + " should be deleted")
    }
    else{
        if (value.inSection < value.outSection)
    {
        value.SwitchFrom = value.inSection
        value.inSection+=1
        
    }
    else if (value.inSection > value.outSection)
    {
        value.SwitchFrom = value.inSection
        value.inSection-=1
    }
    if(value.inSection == value.outSection)
        {
            value.eventType = "ExitHighway"
        }
        else{
        value.eventType = "SwitchToll"
        }
    }
    
    // console.log(value.carduuid)
    // console.log(value.eventType)
    // }
    

}





jssim = require('js-simulator');
var scheduler = new jssim.Scheduler();

var rank = 1; // the higher the rank, the higher the priority assigned and the higher-rank event will be fired first for all events occurring at the same time interval
var evt = new jssim.SimEvent(rank);
evt.id = 1; 
evt.update = function(deltaTime) {
    
    carMap.forEach(moveCarsOneUp);
    simulateNewCar()
    kafka.publish(carMap)
    // var colorsaray = misc.colorArray
    // var randomnumber =  Math.floor(Math.random() * colorsaray.length);
    // console.log(colorsaray[randomnumber])
    //console.log('event [' + this.id + '] with rank ' + this.rank + ' is fired at time ' + this.time);
};
 
var interval = 1; // time interval between consecutive firing of the event
var start_time = 1; // time to fire the event for the first time
scheduler.scheduleRepeatingAt(evt, start_time, interval);

setInterval(function(){ 
    
    scheduler.update();
}, 7500); // 5 seconds

server.listen(port, () => console.log(`Simulator app listening at http://localhost:${port}`));