import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardTitleService {
  private titleOpenBoard = new BehaviorSubject<string>('');

  constructor() { }

  public getTitleBoard(): string {
    return this.titleOpenBoard.getValue();
  }

  public setTitleBoard(title: string): void {
    this.titleOpenBoard.next(title);
  }
}
