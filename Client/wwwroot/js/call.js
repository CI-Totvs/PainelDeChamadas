"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:44396/CallHub").withAutomaticReconnect().configureLogging(signalR.LogLevel.Information).build();
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    document.getElementById("pacient").innerHTML = user;
    document.getElementById("place").innerHTML = msg;
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = pacientes[index];//teste
    var message = lugar[index];//teste
    index++;//teste
    connection.invoke("Call", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

//testes 
var index = 0;
var pacientes = ["conrado0", "conrado1", "conrado2", "conrado3", "conrado4", "conrado5", "conrado6", "conrado7"];
var lugar = ["Sala0", "Sala1", "Sala2", "Sala3", "Sala4", "Sala5", "Sala6", "Sala7"];
