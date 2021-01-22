import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
      this.router.navigate(['/inicio/landing']);
  }

}
