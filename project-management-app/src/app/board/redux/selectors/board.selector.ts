import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateBoard } from '../state.model';

export const selectState = createFeatureSelector<StateBoard>('board');

export const selectGetColumns = createSelector(
  selectState,
  (state) => state.columns,
);

export const selectGetTasks = (columnId: string) => createSelector(
  selectState,
  (state) => state.tasks[columnId],
);

export const selectGetBoardId = createSelector(
  selectState,
  (state) => state.idOpenBoard,
);
