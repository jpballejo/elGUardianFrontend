import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map
 } from 'rxjs/operators';
import { Router } from '@angular/router';
//interceptor que injecta el token en las cabeceras
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('ACCESS_TOKEN');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(request);
    }

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.router.navigateByUrl('/auth');
      }
      return Observable.throw(err);
    })).pipe(map((event: HttpEvent<any>) => {
      if(event instanceof HttpRequest){
        console.log('REQUESTconHEADERS::',event);
      }
      return event;
    }));
}
  }
