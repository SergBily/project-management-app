import { Injectable } from '@angular/core';
import { LoggedUser } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class DateUserService {
  constructor() { }

  public getloginedUserId(): string {
    const token = localStorage.getItem('token') as string;
    const user: LoggedUser = this.parseJwt(token);

    return user.userId;
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
  }
}
