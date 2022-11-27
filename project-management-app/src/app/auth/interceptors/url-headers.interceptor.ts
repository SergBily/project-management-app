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
  constructor(private authState: AuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken: string | null = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (request.method !== 'DELETE') {
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('accept', 'application/json');
    }

    if (this.authState.getCurrentState()) {
      headers = headers.set('Authorization', `Bearer ${userToken}`);
    }

    const newRequest = request.clone({
      url: environment.baseUrl + request.url,
      headers,
    });

    if (request.url.indexOf('assets/i18n') !== -1) {
      return next.handle(request);
    }
    return next.handle(newRequest);
  }
}
