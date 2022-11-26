import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private previousPage = new BehaviorSubject<string>('');

  private currentsPage = new BehaviorSubject<string>('');

  constructor() {}

  public setPreviousUrl(url: string): void {
    this.previousPage.next(url);
  }

  public setCurrentUrl(url: string): void {
    this.currentsPage.next(url);
  }

  public getChanhedPreviousUrl(): Observable<string> {
    return this.previousPage.asObservable();
  }

  public getCurrentUrl(): string {
    return this.currentsPage.getValue();
  }
}
