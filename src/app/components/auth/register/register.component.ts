import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  }, [
      Validators.required,
      Validators.email,
    ]);

  constructor(private authSvc: AuthService, private router: Router) { }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      console.log(email, password);
      const user = await this.authSvc.register(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }
  cancelar() {
    this.router.navigate(['/auth/login']);
  }
  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/inicio']);
    } else if (user) {
      this.router.navigate(['/inicio']);
      //this.router.navigate(['/auth/verification-email']);
    } else {
      this.router.navigate(['/auth/register']);
    }
  }
}
