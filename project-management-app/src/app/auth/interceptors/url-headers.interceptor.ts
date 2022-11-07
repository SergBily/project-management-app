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
import { AuthStateService } from '../services/auth-state/auth-state.service';

@Injectable()
export class UrlHeadersInterceptor implements HttpInterceptor {
  headers!: HttpHeaders;

  constructor(private authState: AuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken: string | null = localStorage.getItem('token');

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });

    if (this.authState.getCurrentState()) {
      this.headers = this.headers.set('Authorization', `Bearer ${userToken}`);
    }

    const newRequest = request.clone({
      url: environment.baseUrl + request.url,
      headers: this.headers,
    });
    return next.handle(newRequest);
  }
}
