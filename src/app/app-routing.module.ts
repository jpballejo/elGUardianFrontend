import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "inicio",  loadChildren: () => import('./components/principal/principal.module').then((m) => m.PrincipalModule),},
  { path: "auth", loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), },
  {path: "**", redirectTo: "inicio", pathMatch: "full" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
