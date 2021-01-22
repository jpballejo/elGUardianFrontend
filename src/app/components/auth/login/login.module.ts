import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "../../../material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [LoginComponent],
  imports: [HttpClientModule,FlexLayoutModule,CommonModule, LoginRoutingModule, ReactiveFormsModule,MaterialModule],
})
export class LoginModule {}
