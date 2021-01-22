import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalModule } from './components/principal/principal.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './components/auth/services/auth.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from "./interceptors/header.interceptor";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [PrincipalModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
  ], exports: [AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule],
  providers: [AuthService,  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
