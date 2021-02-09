import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PrincipalRoutingModule } from "./principal.routing.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from "../../material/material.module";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarrucelComponent } from "./carrucel/carrucel.component";
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ItemComponent } from './comentarios/item/item.component'
import { CarouselItemDirective } from './comentarios/carrousel-item.directive';
import { ServiciosComponent } from "./servicios/servicios.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PaginaInicioComponent, NavBarComponent, LandingPageComponent,
    CarrucelComponent,
    ServiciosComponent,
    ComentariosComponent,
    ItemComponent, CarouselItemDirective
  ],

  imports: [
    CommonModule,
    PrincipalRoutingModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    MatCarouselModule.forRoot(),
  ],

  exports: [PaginaInicioComponent,
    LayoutModule,
  ],
})
export class PrincipalModule { }
