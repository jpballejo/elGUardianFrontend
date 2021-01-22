import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//importo los componentes
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendEmailComponent } from "./send-email/send-email.component";

const routes: Routes = [//declaro las rutas a los modulos
  { path: "", redirectTo: "login", pathMatch: "full" },//aca redirige
  //|||||||||||carga lenta: a medida que lo pide ||||||||
  //{ path: "NOMBREMODULO", loadChildren: () => import('./example/example.module').then(m => m.Example), },
  { path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule), },// modulo login
  { path: "signup", loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), },//modulo signup
  { path: "forgot-password", loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule), },//modulo reseteo password
  { path: "verification-email", component: SendEmailComponent }, //email de verificacion
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouting { }
