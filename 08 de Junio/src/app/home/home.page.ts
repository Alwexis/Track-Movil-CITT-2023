import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemons: any = [];

  constructor(private _http: HttpClient, private _storage: Storage) {}

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
    
    let pokemonCache = await this._storage.get('pokemones');
    if (pokemonCache) {
      this.pokemons = pokemonCache;
    } else {
      let respuesta: any = await firstValueFrom(this._http.get('https://pokeapi.co/api/v2/pokemon'))
      let resultado = respuesta.results;
      for (let pokemon of resultado) {
        let infoPokemon: any = await firstValueFrom(this._http.get(pokemon.url));
        console.log(infoPokemon.types[0])
        this.pokemons.push({
          nombre: infoPokemon.name,
          imagen: infoPokemon.sprites.other['official-artwork'].front_default,
          altura: infoPokemon.height,
          peso: infoPokemon.weight,
        });
      }
      await this._storage.set('pokemones', this.pokemons);
    }
    console.log(this.pokemons);
    
  }
}
