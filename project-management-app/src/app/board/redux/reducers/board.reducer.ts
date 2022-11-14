import {
  Action, createReducer, on,
} from '@ngrx/store';
import { ApiBoardActions, BoardActions } from '../actions/board.actions';
import { StateBoard } from '../state.model';

export const initialState: StateBoard = {
  columnsOpenBoard: [],
  tasks: [],
  idOpenBoard: '',
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadOpenBoard, (state, { id }): StateBoard => ({
    ...state,
    idOpenBoard: id,
    columnsOpenBoard: [],
  })),
  on(ApiBoardActions.getColumnSuccess, (state, { columns }): StateBoard => ({
    ...state,
    columnsOpenBoard: columns,
  })),
);

export function reducer(state: StateBoard | undefined, action: Action) {
  return boardReducer(state, action);
}
