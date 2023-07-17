import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  displayedColumns:string[]=['position','name'];
  data:any[]=[];
  dataSource=new MatTableDataSource<any>(this.data);
  pokemons=[];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }
  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(150, 0).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<any>(data.results);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error(err),
      complete: () => console.log('Pokemons loaded')
    });
  }
  
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

}
