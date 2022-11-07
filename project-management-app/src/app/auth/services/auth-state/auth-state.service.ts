import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private state: boolean = !!localStorage.getItem('token');

  private authSubject = new BehaviorSubject<boolean>(this.state);

  constructor() { }

  public setAuthState(state: boolean): void {
    this.authSubject.next(state);
  }

  public getCurrentState(): boolean {
    return this.authSubject.getValue();
  }

  public getStateChanged(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
