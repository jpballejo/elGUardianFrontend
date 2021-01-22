import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';

const routes: Routes = [
  {
    path: '', component: PaginaInicioComponent,
    children: [
      { path: "landing", component: LandingPageComponent, },
      {
        path: "usuario",
        loadChildren: () => import('../usuario/usuario.module').then(m => m.UsuarioModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule { }
