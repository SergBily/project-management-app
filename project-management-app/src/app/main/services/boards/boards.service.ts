import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError, EMPTY, Observable, retry, take,
} from 'rxjs';
import { PostBoardRequest, Board } from '../../models/board';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(private http: HttpClient, public router: Router) { }

  public addBoard(data: PostBoardRequest): Observable<Board> {
    return this.http.post<Board>('/boards', data).pipe(
      retry(2),
      take(1),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards').pipe(
      retry(2),
      take(1),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }

  public getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`/boards/${id}`).pipe(
      retry(2),
      take(1),
      catchError((error) => {
        console.log('[ERROR]', error);
        this.router.navigate(['page-not-found']);
        return EMPTY;
      }),
    );
  }

  public deleteBoard(id: string) {
    return this.http.delete(`/boards/${id}`).pipe(
      retry(2),
      take(1),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }
}
