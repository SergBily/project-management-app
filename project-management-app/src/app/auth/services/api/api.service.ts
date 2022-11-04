import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignUpData, SignUpResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public signUp(data: SignUpData): Observable<SignUpResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<SignUpResponse>(`${environment.baseUrl}/signup`, data, { headers });
  }
}
