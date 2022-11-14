import {
  createAction, createActionGroup, emptyProps, props,
} from '@ngrx/store';
import { Column } from '../state.model';

export namespace BoardActionss{
  export const getColumns = createAction('[Board page] Get columns', props<{ columns: Column[] }>);
  export const getTasks = createAction('[Board page] Get tasks');
  export const setTask = createAction('[Board page] Set task');
}

export const BoardActions = createActionGroup({
  source: 'Board page',
  events: {
    'Get columns': emptyProps(),
    'Load open board': props<{ id: string }>(),
  },
});

export const ApiBoardActions = createActionGroup({
  source: 'Board page',
  events: {
    'Get column success': props<{ columns: Column[] }>(),
  },
});
