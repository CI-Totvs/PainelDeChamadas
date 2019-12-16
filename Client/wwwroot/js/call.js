"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:44396/CallHub").configureLogging(signalR.LogLevel.Information)
    .build();
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    console.log('Connected!');
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", (user, message) => {
    const encodedMsg = user + " says " + message;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("Call", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
});

async function start() {
    try {
        await connection.start();
        console.log("connected");
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};

connection.onclose(async () => {
    await start();
});