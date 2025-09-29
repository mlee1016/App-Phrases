import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from './interceptors/cookie.service';


@Injectable({providedIn:'root'})
export class HeaderInterceptor implements HttpInterceptor {
  
  constructor(private cookie:CookieService){

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token_ = JSON.stringify({jwt:localStorage.getItem('jwt')})
    let token = JSON.parse(token_)
    if (token){
    request = request.clone({
      setHeaders: {
        'Authorization': `Token ${token.jwt}`,
      },
    });
    }
    return next.handle(request);
  }
}