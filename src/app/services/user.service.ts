import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.interface';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpHeaders, HttpRequest, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtResponseI } from "../shared/models/jwt-response";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = `${environment.apiURL}`;
  public options$ = new ReplaySubject(null);//variable options
  constructor(public HttpClient: HttpClient) {

  }
  ///////////////////////////////////////////// Handle API errors
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
  /////////////////////////////////////////////////////////////////

  //////////GETERS/////////////////////////////////////////////////

  getUserInfo(user): Observable<User> {
    if (!user) {
      return this.HttpClient.get<User>(`${this.apiURL}users/user`)
        .pipe(retry(2), catchError(this.handleError))
        .pipe(map((res: User) => res))
    }
    if (user) {
      return this.HttpClient.get<User>(`${this.apiURL}users/user/${user}`)
        .pipe(retry(2), catchError(this.handleError))
        .pipe(map((res: User) => res))

    }
  }

  getUsers(): Observable<User[]> {
    return this.HttpClient.get<User[]>(`${this.apiURL}users/all`)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map((res: User[]) => res))
  }

  /////////////////////////////////////////////////////////////////

  //////////UPDATE/////////////////////////////////////////////////

  updateUser(userMod: User): Observable<User> {
    var users = [userMod];
    return this.HttpClient.put<User>(`${this.apiURL}users/actualizar/${users}`, null)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map((res: User) => res))
  }

  updateUsers(userMod: User[]): Observable<User[]> {
    return this.HttpClient.put<User[]>(`${this.apiURL}users/actualizar/${userMod}`, null)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map((res: User[]) => res))

  }

  /////////////////////////////////////////////////////////////////

  //////////DELETE/////////////////////////////////////////////////

  deleteUser(id: String): Observable<any | any[]> {
    return this.HttpClient.delete<User>(`${this.apiURL}users/borrar/${id}`, null)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map((usu: any) => usu.map((user: User) => user)));//se mapea asi la respuesta, entonces no da error
  }

  deleteUsers(id: String[]): Observable<User[]> {
    return this.HttpClient.delete<User[]>(`${this.apiURL}users/borrar${id}`, null)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map((usu: any) => usu.map((user: User[]) => user)));
  }
  /////////////////////////////////////////////////////////////////


}
