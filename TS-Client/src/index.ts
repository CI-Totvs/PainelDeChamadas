import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44396/CallHub").configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", (user: string, message: string) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var text = username + " " + msg;
    document.getElementById("pacient").innerHTML = user;
    document.getElementById("place").innerHTML = msg;
    //say(text);
});

connection.start().catch(err => document.write(err));

//tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
//    if (e.keyCode === 13) {
//        send();
//    }
//});

//btnSend.addEventListener("click", send);
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = pacientes[index];//teste
    var message = lugar[index];//teste
    index++;//teste
    console.log(user, message);
    connection.invoke("Call", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

//function send() {
//    var user = pacientes[index];//teste
//    var message = lugar[index];//teste
//    index++;//teste
//    console.log(username + " " + tbMessage.value);//teste

//    connection.send("newMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
        
//}

//testes 
var index = 0;
var pacientes = ["conrado0", "conrado1", "conrado2", "conrado3", "conrado4", "conrado5", "conrado6", "conrado7"];
var lugar = ["Sala0", "Sala1", "Sala2", "Sala3", "Sala4", "Sala5", "Sala6", "Sala7"];

//Componentes