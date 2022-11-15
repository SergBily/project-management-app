import { Injectable } from '@angular/core';
import {
  Actions, concatLatestFrom, createEffect, ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError, EMPTY, forkJoin, map, mergeMap, of,
} from 'rxjs';
import { ApiBoardService } from 'src/app/board/services/api/api.service';
import { ApiBoardActions, BoardActions } from '../actions/board.actions';
import { selectGetBoardId } from '../selectors/board.selector';

@Injectable()
export class BoardEffects {
  loadColumns$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardActions.getColumns, BoardActions.loadOpenBoard),
        concatLatestFrom(() => this.store.select(selectGetBoardId)),
        mergeMap(([, id]) => this.api.getColumns(id)),
        map((columns) => ApiBoardActions.getColumnSuccess({ columns })),
        catchError(() => EMPTY),
      );
    },
  );

  loadTasks$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BoardActions.getTasks),
        mergeMap((date) => {
          const tasks = this.api.getTasks(date);
          return forkJoin([of(date.columnId), tasks]);
        }),
        map(([columnId, tasks]) => ApiBoardActions.getTaskSuccess({ columnId, tasks })),
        catchError(() => EMPTY),
      );
    },
  );

  constructor(
    private actions$: Actions,
    private api: ApiBoardService,
    private store: Store,
  ) { }
}
