import { AuthService } from '../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnDestroy {
  public user$: Observable<User> = null;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;


  constructor(private authSvc: AuthService) {
  this.user$ = this.authSvc.afAuth.user;
    console.log(this.user$);
  }

   onSendEmail() {
    console.log('enviando...');
     this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    console.log('ondestroy');
    this.authSvc.logout();

  }
}
