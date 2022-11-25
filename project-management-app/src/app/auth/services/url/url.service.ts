import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private previousPage = new BehaviorSubject<string>('');

  constructor() {}

  public setPreviousPage(url: string): void {
    this.previousPage.next(url);
  }

  getChanhedPreviousUrl(): Observable<string> {
    return this.previousPage.asObservable();
  }
}
