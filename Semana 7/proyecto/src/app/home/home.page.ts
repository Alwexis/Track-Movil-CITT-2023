import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemon: any;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
      this.getPokemones()
  }

  async getPokemones() {
    /*
    this._http.get('https://pokeapi.co/api/v2/pokemon').subscribe(
      (response: any) => {
        this.pokemon = response['results'];
        console.log(this.pokemon)
      },
      error => {
        console.log('No se encontró lo que se buscó')
      }
    )
    */

    let respuesta: any = await firstValueFrom(this._http.get('https://pokeapi.co/api/v2/pokemon'))
    this.pokemon = respuesta.results
    console.log(this.pokemon)
  }

}
