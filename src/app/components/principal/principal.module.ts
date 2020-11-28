import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { BrowserModule } from '@angular/platform-browser';
import { CarrucelComponent } from './carrucel/carrucel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule, MatCarousel} from '@ngmodule/material-carousel';
@NgModule({
  declarations: [PaginaInicioComponent,NavBarComponent, CarrucelComponent],
  imports: [
    CommonModule, LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,MatCarouselModule.forRoot(),
  ],
  exports: [PaginaInicioComponent, NavBarComponent, LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,MatCardModule,]
})
export class PrincipalModule { }
