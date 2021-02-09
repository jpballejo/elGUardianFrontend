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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from "./interceptors/header.interceptor";
import { AngularResizedEventModule } from 'angular-resize-event';
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { UserService } from './services/user.service';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import 'firebase/storage';
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
    AngularResizedEventModule,
    AngularFireStorageModule,
  ], exports: [AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: BUCKET,
      useValue: 'gs://elguardian-283604.appspot.com/'
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
