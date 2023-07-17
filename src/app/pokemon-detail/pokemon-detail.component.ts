import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any=null;
  evolutionChain: any=null;
  specie: any=null;
  evolution :string='';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const name = this.route.snapshot.paramMap.get('name') ?? '{}';
    this.pokemonService.getPokemon(name)
    .subscribe(pokemon => {
    this.pokemon = pokemon;
    this.getSpecie(pokemon.species.url);
    //this.getevolution(pokemon.species.url);
    });
    }

    getSpecie(url: string): void {
      const id = Number(url.split('/').slice(-2, -1)[0]);
      this.pokemonService.getSpecie(id)
      .subscribe(specie => {
      this.specie = specie;
      this.getEvolutionChain(specie.evolution_chain.url);
      });

      if(this.specie.evolves_from_species==null){
        this.evolution=this.evolutionChain.chain.evolves_to.species.name;
      }
      if(this.specie.evolves_from_species!=null && this.evolutionChain.chain.evolves_to[0].evolves_to==null){
        this.evolution="este pokemon no tiene evolucion";
      }
      if(this.specie.evolves_from_species!=null && this.evolutionChain.chain.evolves_to[0].evolves_to!=null){
        this.evolution=this.evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
      }
      };

  getEvolutionChain(url: string): void {
    const id = Number(url.split('/').slice(-2, -1)[0]);
    this.pokemonService.getEvolutionChain(id)
      .subscribe(evolutionChain => {
        this.evolutionChain = evolutionChain;
      });    
  }

  /* getevolution(url: string): void{
    const id = Number(url.split('/').slice(-2, -1)[0]);
    this.pokemonService.getSpecie(id)
    .subscribe(specie => {
    this.specie = specie;
    this.getEvolutionChain(specie.evolution_chain.url);
  });

    if(this.specie.evolves_from_species==null){
      this.evolution=this.evolutionChain.chain.evolves_to.species.name;
    }
    if(this.specie.evolves_from_species!=null && this.evolutionChain.chain.evolves_to[0].evolves_to==null){
      this.evolution="este pokemon no tiene evolucion";
    }
    if(this.specie.evolves_from_species!=null && this.evolutionChain.chain.evolves_to[0].evolves_to!=null){
      this.evolution=this.evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
    }
  } */

}