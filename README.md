# Big Data Course Project

Part of our Big Data course we were instructed to create a lambda architecture web project. </br>
The project main topic was to display in real time car information of a certain road that was spliced into 6 sections much like a toll road. </br>
Additionally, we were instructed to use a ML API (BigML) in order to correctly predict a car exit section based on their section entry, car type, day, time etc. </br>

First of all I created the data simulator, this simulator is weighted in order to make a consistent and deterministic data so our BigML API could predict with a certain accuracy the exit point </br>
This simulator was feeding a Kafka server (cloudkarafka.com) events of cars entering sections, switching sections and exiting sections. </br>
I had two node.js consumers : 

MongoDB + BigML : </br>
This consumer is in charge of saving all incoming cars information, using the information to predict the exit section using BigML API, and using Socket.IO sending information to the React Dashboard matrix
with the predicted exit section and actual exit section. </br>
The MongoDB was stored using MongoDB atlas free DB and was used to store historical information.

Redis :
Redis was to store and process quickly all the real time information and display using Socket.IO events it to the dashboard.

## Main architecture
<img src = "https://github.com/VadimKachevski/BigDataProject/blob/master/Pictures/architecture.PNG?raw=true" >

## Dashboard
<img src = "https://github.com/VadimKachevski/BigDataProject/blob/master/Pictures/Dashboard.PNG?raw=true" >

<img src = "https://github.com/VadimKachevski/BigDataProject/blob/master/Pictures/RecentCars.PNG?raw=true" >

<img src = "https://github.com/VadimKachevski/BigDataProject/blob/master/Pictures/carBySection.PNG?raw=true" >

<img src = "https://github.com/VadimKachevski/BigDataProject/blob/master/Pictures/matrix.PNG?raw=true" >
