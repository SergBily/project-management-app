import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignInResponse, SignUpData, SignUpResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public signUp(data: SignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>('/signup', data);
  }

  public signIn(data: SignUpData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/signin', data);
  }
}
