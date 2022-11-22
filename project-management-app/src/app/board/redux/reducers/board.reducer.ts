import {
  Action, createReducer, on,
} from '@ngrx/store';
import { ApiBoardActions, BoardActions, DragAndDropActions } from '../actions/board.actions';
import { StateBoard } from '../state.model';

export const initialState: StateBoard = {
  columns: [],
  tasks: {},
  idOpenBoard: '',
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadOpenBoard, (state, { id }): StateBoard => ({
    ...state,
    idOpenBoard: id,
    columns: [],
  })),
  on(ApiBoardActions.getColumnSuccess, (state, { columns }): StateBoard => ({
    ...state,
    columns,
  })),
  on(ApiBoardActions.getTaskSuccess, (state, { columnId, tasks }): StateBoard => ({
    ...state,
    tasks: { ...state.tasks, [columnId]: tasks },
  })),
  on(DragAndDropActions.changeColumnPosition, (state, { columns }): StateBoard => ({
    ...state,
    columns,
  })),
  on(DragAndDropActions.changeTaskPosition, (state, { tasks }): StateBoard => ({
    ...state,
    tasks,
  })),
  on(DragAndDropActions.changeTaskPositionInColumn, (state, { columnId, tasks }): StateBoard => ({
    ...state,
    tasks: { ...state.tasks, [columnId]: tasks },
  })),
);

export function reducer(state: StateBoard | undefined, action: Action) {
  return boardReducer(state, action);
}
