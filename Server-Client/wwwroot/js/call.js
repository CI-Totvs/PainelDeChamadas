"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/callHub").withAutomaticReconnect().configureLogging(signalR.LogLevel.Information).build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var text = user +" "+  msg;
    document.getElementById("pacient").innerHTML  = user;
    document.getElementById("place").innerHTML = msg;
    say(text);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = pacientes[index];
    var message = lugar[index];
    index++;
    connection.invoke("Call", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
var index = 0;
var pacientes = ["Bruno", "conrado1", "conrado2", "conrado3", "conrado4", "conrado5", "conrado6", "conrado7"];
var lugar = ["Sala da Emergencia", "Sala1", "Sala2", "Sala3", "Sala4", "Sala5", "Sala6", "Sala7"];

function say(m) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "Google português do Brasil";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = "pt-BR";
    msg.localService = true;
    speechSynthesis.speak(msg);
}