import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  catchError, EMPTY, Observable, retry, take,
} from 'rxjs';
import { PostBoardRequest, Board, ParamApiBoard } from '../../models/board';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public addBoard(data: PostBoardRequest): Observable<Board> {
    return this.http.post<Board>('/boards', data).pipe(
      retry(2),
      take(1),
      catchError(() => {
        this.snackBar.open('Board not added :(', 'OK', {
          duration: 2000,
        });
        return EMPTY;
      }),
    );
  }

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards').pipe(
      retry(2),
      take(1),
      catchError(() => EMPTY),
    );
  }

  public getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`/boards/${id}`).pipe(
      retry(2),
      take(1),
      catchError(() => {
        this.router.navigate(['page-not-found']);
        return EMPTY;
      }),
    );
  }

  public deleteBoard(id: string) {
    return this.http.delete(`/boards/${id}`).pipe(
      retry(2),
      take(1),
      catchError(() => EMPTY),
    );
  }

  public updateBoard(param: ParamApiBoard): Observable<Board> {
    return this.http.put<Board>(`/boards/${param.boardId}`, param.data)
      .pipe(
        retry(2),
        take(1),
        catchError(() => EMPTY),
      );
  }
}
