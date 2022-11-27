import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, EMPTY, map, mergeMap,
} from 'rxjs';
import { loadMainBoards, updateMainBoard } from '../actions/main-boards.actions';
import { BoardsApiService } from '../../services/boards/boards.service';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  loadBoards$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateMainBoard),
        mergeMap(() => this.api.getBoards()),
        map((board) => {
          return loadMainBoards({ boards: board });
        }),
        catchError(() => EMPTY),
      );
    },
  );

  constructor(
    private actions$: Actions,
    private api: BoardsApiService,
  ) { }
}
