import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }
  getEvolutionChain(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/evolution-chain/${id}`);
  }
  getSpecie(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${id}`);
  }
}