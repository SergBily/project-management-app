import { Column } from '../redux/state.model';

export interface DataColumn {
  title: string;
  order?: number;
  id?: string;
}

export interface DataTask {
  title: string;
  description: string;
  userId: string;
  id?: string
}

export interface TaskUpdate {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  id?: string
}

export interface ParamApiTask {
  data: DataTask | TaskUpdate;
  boardId: string;
  columnId: string;
  taskId: string
}

export interface ParamApiColumn {
  data: DataColumn;
  boardId: string;
  columnId: string;
}

export interface DataBoardAndColumn {
  column: Column;
  boardId: string
}
