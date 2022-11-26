import {
  createActionGroup, emptyProps, props,
} from '@ngrx/store';
import { Column, StateTask, Tasks } from '../state.model';

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
    'Change task position': props<{ tasks: Tasks }>(),
    'Change task position in column': props<{ columnId: string, tasks: StateTask[] }>(),
  },
});
