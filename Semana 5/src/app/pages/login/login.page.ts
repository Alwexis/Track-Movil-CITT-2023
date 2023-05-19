import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // El valor de esta variable fue extraída de mi Github
  // https://github.com/Alwexis/Track-Movil-CITT-2023/blob/main/Semana%205/Datos%20Login%20-%20Actividad%201.json
  usuarios = [ { "username": "pepito123", "contrasena": "Pepito123", "nombre": "Pepito Ignacio", "apellido": "Perez Lopez", "edad": 25, "rut": "12.345.678-3", "email": "pepito@gmail.com", "telefono": 123456789, "imagen": "https://i.imgur.com/IygvKYw.png" }, { "username": "Khalz", "contrasena": "perro_sonrojado_123", "nombre": "Rodrigo", "apellido": "Seguel", "edad": 19, "rut": "12.559.636-2", "email": "rodrigo@gmail.com", "telefono": 123456789, "imagen": "https://imgur.com/SUsKWJ5.png" }, { "username": "Alwx", "contrasena": "_gato_", "nombre": "Ariel", "apellido": "Silva", "edad": 21, "rut": "26.255.352-5", "email": "ariel@gmail.com", "telefono": 123456789, "imagen": "https://imgur.com/XtGpK74.png" }, { "username": "Calambrito", "contrasena": "calambrin", "nombre": "Mattias", "apellido": "Gonzales", "edad": 23, "rut": "11.535.424-9", "email": "calambrito@hotmail.com", "telefono": 123456789, "imagen": "https://imgur.com/6h0zBDy.png" }, { "username": "Jenn", "contrasena": "123456789", "nombre": "Jenniffer", "apellido": "Coñuel", "edad": 21, "rut": "31.531.255-3", "email": "jenn@gmail.com", "telefono": 123456789, "imagen": "https://imgur.com/xQBuUAq.png" }, { "username": "Jucgie", "contrasena": "lol123", "nombre": "Flavio", "apellido": "Olate", "edad": 21, "rut": "25.533.123-5", "email": "flavio.olate@gmail.com", "telefono": 123456789, "imagen": "https://imgur.com/UsJXnUf.png" } ];

  // Es una variable de tipo object, la cual tiene 2 atributos, username y password.
  credentials = {
    username: '',
    password: ''
  }

  constructor(private _alertCtrl: AlertController, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    // async significa que nuestra función (flecha en este caso) se va a comportar de manera asíncrona
    // Recorremos usuario por usuario para determinar si existe un usuario llamado así.
    //? Esto también se puede lograr utilizando el método find(). Ejemplo:
    //? usuarios.find(usuario => usuario.username === this.credentials.username);
    // Pruébenlo para que vean su funcionalidad. Básicamente lo que hace es buscar un usuario que cumpla
    // con la condición
    this.usuarios.forEach(async (usuario: any) => {
      // Revisamos si es que el usuario en el ciclo es el ingresado por la persona.
      if (this.credentials.username == usuario.username) {
        // Revisamos si la contraseña ingresada es la misma que la del usuario.
        if (this.credentials.password === usuario.contrasena) {
          // Creamos una variable data que guardaremos en el state de la navegación.
          let data: NavigationExtras = {
            state: {
              usuario: usuario,
              mensaje: 'Hola'
            }
          }
          // Navegamos a la página home y le pasamos la variable data.
          this._router.navigate(['home'], data);
        } else {
          // Si la contraseña es incorrecta, mostramos un alert.
          // Para mostrar un alert, debemos crearlo y luego mostrarlo con el método present()
          // La documentación de las alertas está en
          //? https://ionicframework.com/docs/api/alert
          let alerta = await this._alertCtrl.create({
            header: '¡Error!',
            subHeader: 'NO pudiste iniciar sesión',
            message: 'Las credenciales que proporcionaste son incorrectas.',
            buttons: [
              {
                text: 'Ok',
                role: 'ok'
              }
            ]
          });
          await alerta.present();
        }
      }
    })
  }

}
