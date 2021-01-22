import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.interface';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {

  }

  async onLogout() {
  try {
    await this.authSvc.logout();
    console.log('logout');
    this.router.navigate(['/login']);
  } catch (error) {
    console.log(error);
  }
}
}
