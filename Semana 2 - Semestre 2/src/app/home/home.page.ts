import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre_usuario: string = '';
  mensaje: string = '';
  mensajes: any = [];
  // Creamos un objeto de WebSocket
  private _websocket: WebSocket = new WebSocket('wss://citt2023-dev.fl0.io')

  constructor() {
    // Le asignamos un callback (función) al evento onOpen del WebSocket
    // El evento OnOpen es cuando el cliente se conecta al WebSocket
    this._websocket.onopen = () => {
      console.log('Escuchando al servidor')
    };
    // Le asignamos un callback (función) al evento onClose del WebSocket
    // El evento OnClose es cuando el cliente se desconecta del WebSocket
    this._websocket.onclose = () => {
      console.log('Desconectado');
    }
    // Le asignamos un callback (función) al evento onMessage del WebSocket
    // El evento OnMessage es cuando el cliente recibe un mensaje del WebSocket
    this._websocket.onmessage = (e: any) => {
      // Obtenemos el mensaje con e.data. El parámetro "e" es el evento que se dispara
      // Lo parseamos a JSON para poder acceder a sus propiedades, ya que el mensaje enviado mediante el WebSocket es un
      // Objeto JSON transformado a String
      let mensaje_recibido = JSON.parse(e.data);
      // Agregamos el mensaje recibido al arreglo de mensajes
      this.mensajes.push(
        {
          usuario: mensaje_recibido.usuario,
          mensaje: mensaje_recibido.mensaje
        }
      );
    }
  }

  sendMessage() {
    // Creamos un objeto JSON con el nombre de usuario y el mensaje
    // Lo transformamos a String con JSON.stringify
    let mensajeJSON = JSON.stringify({ usuario: this.nombre_usuario, mensaje: this.mensaje });
    // console.log(mensajeJSON);
    // Enviamos el mensaje al WebSocket
    this._websocket.send(mensajeJSON);
  }

}
