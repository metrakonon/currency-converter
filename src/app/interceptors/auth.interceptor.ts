import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      url: req.url.replace('https://api.exchangerate-api.com/v4/latest/UAH', 'https://v6.exchangerate-api.com/v6/d11772025d72cda9c165c6aa/latest/UAH')
    });
    return next.handle(clonedRequest);
  }
}
