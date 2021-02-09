import { User } from '../../../shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RoleValidator } from '../../auth/helpers/roleValidator';
import { environment } from '../../../../environments/environment';
import { JwtResponseI } from "../../../shared/models/jwt-response";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })

  export class AuthService extends RoleValidator {
  public user$: Observable<User>;//Observable para determinar el estado del usuario en la sesion
  apiURL: string = `${environment.apiURL}`;//variable con la ruta http sacada de enviroment
  authSubject = new BehaviorSubject(false);
  private token$ = new BehaviorSubject(null);//observable para almacenar el token del backend
  public options$ = new ReplaySubject(null);//variable options
  private token: string;//string que almacena el token del backend

  constructor(public afAuth: AngularFireAuth, public HttpClient: HttpClient) {
    super();
    //en esta variable seteo el user que viene de firebase
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log("USUARIO:>", user);
        }
        return of(null);
      })
    );
  }
  setearUSER(user) {
    var usuario = {}

  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  ////////////////////////////*******FIREBASE-AUTH*********************/////////////////////////
  //loginFacebook
  async loginFacebook(): Promise<User> {
    try {
      const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email');
      const { user } = await this.afAuth.signInWithPopup(provider);
      console.log(user);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }

    return
  }//login con facebook uando firebase
  /////////////////////****************************************************************////////////////
  //lloginGoogle
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      //console.log("USUARIO:>", user);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }//login con google usando firebase
  /////////////////////****************************************************************////////////////
  //reseteo de password
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }//reseteo de contrasenia firebase
  /////////////////////****************************************************************////////////////
  //envio de email de verificacion
  async sendVerificationEmail() {
    console.log('PRUEBA');
    return (await this.afAuth.currentUser).sendEmailVerification().then((d) => { console.log('VERIFICACION DE MAIL', d); return true; });
  }//envio de mal de verificacion con firebase
  /////////////////////****************************************************************////////////////
  //loginconUserYPass
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }//login con user y pass de firebase
  /////////////////////****************************************************************////////////////
  //registro de usuario
  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      //  console.log(user);
      await this.altaUserBackend(user, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }//registro con firebase
  /////////////////////****************************************************************////////////////
  //logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.user$ = null;
      await this.limpiarSession();
      console.log("limpieSession");
    } catch (error) {
      console.log(error);
    }
  }//cerrar sesion firebase
  /////////////////////****************************************************************////////////////
  async  updateUserData(user: User) {
    console.log('updateUserData');
    console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };//esta funcion actualiza el usuario
    this.loginBackend(user).subscribe(m => console.log(m));
  }

  async  altaUserBackend(user: User, password: string) {

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'USER',

    };
    this.registrarBackend(user).subscribe(o => console.log(o));

  }
  /////////////////////////////////////*******FIREBASE-AUTH*********************/////////////////////////


  //////////Setter - Getter**************///////////////////////////////////////////////////////
  setToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
    this.token$.next(token);
    console.log('Seteo token');
  }
  /////////////////////****************************************************************////////////////
  public getToken(): string { if (!this.token) { this.token = localStorage.getItem('ACCESS_TOKEN'); } return this.token; }
  public getToken$() { if (this.token$.getValue) return this.token$; return this.token$.next(this.getToken()); }
  /////////////////////****************************************************************////////////////
  setUser(user: User) {
    console.log(user);

    //  localStorage.setItem('userSess', JSON.stringify(user));
  }//this.user$.next(user); }
  /////////////////////****************************************************************////////////////
  public getUser() {
    return JSON.parse(localStorage.getItem('userSess'));
  }
  //////////Setter - Getter**************///////////////////////////////////////////////////////

  /////////////////////****************************************************************////////////////

  limpiarSession() {
    console.log("limpiarSession");
    localStorage.removeItem('userSess');
    localStorage.removeItem('ACCESS_TOKEN');
  }
  /////////////////////****************************************************************////////////////



  /////////////////////****************************************************************////////////////

  private registrarBackend(user: User): Observable<JwtResponseI> {

    const idToken = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      //Send token to your backend via HTTPS
      return idToken;
      // ...
    }).catch(function(error) {
      //Handle error
    });

    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}signup`, { user: user }).pipe(
      retry(2),
      catchError(this.handleError)
    )
      .pipe(map((res: JwtResponseI) => {
        if (res) {
          this.setToken(res.token);
          console.log('respuesta signup: ' + res);
          //this.setUser(res);
          return res;
        }
      }));

  }

  /////////////////////****************************************************************////////////////
  private prueba() {
    console.log('prueba');
    (this.HttpClient.get(`${this.apiURL}users/all`)).pipe(
      retry(2),
      catchError(this.handleError)
    ).subscribe((data) => console.log('DATA>', data));

  }
  /////////////////////****************************************************************////////////////

  private loginBackend(user: User): Observable<JwtResponseI> {
    console.log('loginBackend');
    return this.HttpClient.post<JwtResponseI>(`${this.apiURL}signup`, { user: user }).pipe(
      retry(2),
      catchError(this.handleError)
    )
      .pipe(map((res: JwtResponseI) => {
        if (res) {
          this.setToken(res.token);
          console.log('respuesta login: ' + res);
          //this.setUser(res);
          return res;
        }
      }))


  }

  /////////////////////****************************************************************////////////////

}
