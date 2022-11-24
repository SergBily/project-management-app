import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/board';

export const loadMainBoards = createAction(
  '[MainBoards] Load Main Boards',
  props<{ boards: Board[] }>(),
);

export const addMainBoard = createAction(
  '[MainBoards] Add Main Board',
  props<{ board: Board }>(),
);

export const deleteMainBoard = createAction(
  '[MainBoards] Delete Main Board',
  props<{ id: string }>(),
);
