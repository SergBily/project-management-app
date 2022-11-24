import { createReducer, on } from '@ngrx/store';
import { Board } from '../../models/board';
import { loadMainBoards, addMainBoard, deleteMainBoard } from '../actions/main-boards.actions';

export const initialState: Board[] = [];

export const reducer = createReducer(
  initialState,
  on(loadMainBoards, (state, { boards }): Board[] => ([...boards])),
  on(addMainBoard, (state, { board }): Board[] => ([...state, board])),
  on(deleteMainBoard, (state, { id }): Board[] => state.filter((board) => board.id !== id)),
);
