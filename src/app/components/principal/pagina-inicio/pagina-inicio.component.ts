import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CarrucelComponent } from "../carrucel/carrucel.component";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
