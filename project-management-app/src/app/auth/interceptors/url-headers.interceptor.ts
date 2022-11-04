import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken: string | null = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });

    if (userToken) {
      headers.set('Authorization', `Bearer ${userToken}`);
    }

    const newRequest = request.clone({
      url: environment.baseUrl + request.url,
      headers,
    });
    return next.handle(newRequest);
  }
}
