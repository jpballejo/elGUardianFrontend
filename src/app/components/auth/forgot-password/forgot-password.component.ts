import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router,private _snackBar: MatSnackBar) {}

  async onReset() {
    try {
      const email = this.userEmail.value;
      if(email){await this.authSvc.resetPassword(email);
        this.openSnackBar('Correo electrónico enviado, revise su bandeja de entrada!','Notificacion!');
        this.router.navigate(['/auth/login']);}else{this.openSnackBar('Debe ingresar un email','Alerta!');}

    } catch (error) {
      console.log(error);
    }
  }

  openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}
}
