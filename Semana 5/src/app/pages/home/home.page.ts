import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  usuario?: any;
  mensaje = '';

  // El constructor es un método que se ejecuta cuando se crea una instancia de la clase.
  // En este caso, cuando se crea una instancia de la clase HomePage, se ejecuta el constructor.
  // El constructor recibe como parámetros los servicios que se van a utilizar.
  // En este caso, se utiliza el servicio ActivatedRoute para obtener los parámetros de la ruta.
  // También se utiliza el servicio Router para obtener el estado de la navegación.
  constructor(private _activateRoute: ActivatedRoute, private _router: Router) {
    // Se obtienen los parámetros de la ruta.
    // subscribe() es un método que se ejecuta cuando se obtienen los parámetros de la ruta.
    this._activateRoute.queryParams.subscribe((params: any) => {
      // Se obtiene el estado (o datos enviados) utilizando el método getCurrentNavigation()
      // del servicio Router. Accedemos a los datos utilizando la propiedad extras.state.
      const navigationState = this._router.getCurrentNavigation()?.extras.state;
      // Se comprueba si existe el estado.
      if (navigationState) {
        // Se obtienen los datos del estado. En este caso, el usuario y el mensaje.
        this.usuario = navigationState['usuario'];
        this.mensaje = navigationState['mensaje']
      }
    })
  }

}
