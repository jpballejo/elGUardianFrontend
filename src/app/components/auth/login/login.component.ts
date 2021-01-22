import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.interface';

/** Error when invalid control is dirty, touched, or submitted. */
/*export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) {}

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onFacebookLogin(){
    try {
      const user = await this.authSvc.loginFacebook();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      console.log('emailVerified:',user.emailVerified);
      this.router.navigate(['/inicio']);
    } else if (user) {
      console.log('lo tiene true');
      this.router.navigate(['/auth/verification-email']);
    } else {
      this.router.navigate(['/auth/register']);
    }
  }

  cancelar():void{  this.router.navigate(['/inicio']);}
}
