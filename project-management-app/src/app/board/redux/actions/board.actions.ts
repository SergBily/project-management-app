import {
  createActionGroup, emptyProps, props,
} from '@ngrx/store';
import { Column, StateTask } from '../state.model';

export const BoardActions = createActionGroup({
  source: 'Board page',
  events: {
    'Get columns': emptyProps(),
    'Get tasks': props<{ boardId: string, columnId: string }>(),
    'Load open board': props<{ id: string }>(),
  },
});

export const ApiBoardActions = createActionGroup({
  source: 'Board page',
  events: {
    'Get column success': props<{ columns: Column[] }>(),
    'Get task success': props<{ columnId: string, tasks: StateTask[] }>(),
  },
});

export const DragAndDropActions = createActionGroup({
  source: 'Board page',
  events: {
    'Change column position': props<{ columns: Column[] }>(),
  },
});
