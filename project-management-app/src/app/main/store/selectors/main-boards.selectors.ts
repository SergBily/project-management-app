import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Board } from '../../models/board';

export const selectState = createFeatureSelector<Board[]>('mainBoards');

export const selectGetMainBoards = createSelector(
  selectState,
  (state) => state,
);
