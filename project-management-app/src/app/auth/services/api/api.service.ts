import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, take } from 'rxjs';

import {
  User, SignInResponse, SignUpData,
} from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public signUp(data: SignUpData): Observable<User> {
    return this.http.post<User>('/signup', data);
  }

  public signIn(data: SignUpData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/signin', data);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`/users/${id}`)
      .pipe(
        retry(2),
        take(1),
      );
  }
}
