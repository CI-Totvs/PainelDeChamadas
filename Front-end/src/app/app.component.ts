import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private hubConnection: HubConnection;
  nick = 'Paciente';
  message = 'Consultorio';
  index : number = 0; // teste
  pacientes = ["conrado0", "conrado1", "conrado2", "conrado3", "conrado4", "conrado5", "conrado6", "conrado7"];//teste
    lugar = ["Sala0", "Sala1", "Sala2", "Sala3", "Sala4", "Sala5", "Sala6", "Sala7"]; //teste
  ngOnInit() {
    

    this.hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44396/CallHub")
    .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));




      this.hubConnection.on("ReceiveMessage", (user: string, message: string) => {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        //var text = user + " go to " + msg;
        this.nick = user;
        this.message = msg;
        //say(text);
       });

    
    }
    chamada(){
      let nome = this.pacientes[this.index];
      let dir = this.lugar[this.index];
      this.index ++;
      this.hubConnection.invoke("Call", nome, dir).catch(err => console.log('Erro no request:('));
    }
    
    

}
