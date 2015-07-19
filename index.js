/**
 * Created by maya on 2015/7/19.
 */
var mqtt = require('mqtt');

var timeSyncTopic = "timesync";
var mqttClientInstance = mqtt.connect("mqtt://localhost:1883", {clientId: timeSyncTopic});
mqttClientInstance.on('connect', function () {
    console.log("connect mqtt server success");
});
mqttClientInstance.on('error',function(error) {
    console.log("mqtt connect failed: ", error);
});
mqttClientInstance.subscribe(timeSyncTopic);

mqttClientInstance.on('message', function(messageTopic, data) {
    var msg = JSON.parse(data);
    if(msg.timesync === "Request"){
        var now = Date.now();
        mqttClientInstance.publish(msg.clientId, JSON.stringify({timesync: "Response", serverTime: now}));
        console.log("response with time: "+now);
    }
});
/* when got exit signal, then exit
 mqttClientInstance.end();
 mqttClientInstance = null;
 console.log("mqtt client has been destroyed");
 */