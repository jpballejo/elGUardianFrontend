import { Injectable } from '@angular/core';
import {
  HttpResponse, HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  console.log('REQUESTsinHEADERS::', request);
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${environment.apiURL}`,
      'Access-Control-Allow-Credentials': 'true',
      'Accept': 'application/json'
    });//creo un objeto httpHeaders que contiene los encabezados
    //  console.log('HEADER::', header);
    request = request.clone({ headers: header });
    //  console.log('REQUESTconHEADERS::', request);
    return next.handle(request);
    /*return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if(event instanceof HttpRequest){
        console.log('REQUESTconHEADERS::',event);
      }
      return event;
    }));*/
  }

  /*  intercept(response: HttpResponse<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('RESPONSE::',response);
      //return next.handle(response);
    }*/
}
