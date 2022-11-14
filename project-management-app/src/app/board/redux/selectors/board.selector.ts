import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateBoard } from '../state.model';

export const selectState = createFeatureSelector<StateBoard>('board');

export const selectGetBoards = createSelector(
  selectState,
  (state) => state.columnsOpenBoard,
);

export const selectGetTasks = createSelector(
  selectState,
  (state) => state.tasks,
);

export const selectGetBoardId = createSelector(
  selectState,
  (state) => state.idOpenBoard,
);
