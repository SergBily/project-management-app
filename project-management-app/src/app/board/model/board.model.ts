import { Column } from '../redux/state.model';

export interface DataColumn {
  id: string;
  title: string
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
  id?: string;
  files?: TaskFile[];
}

export interface TaskFile {
  filename: string,
  fileSize: number,
}

export interface ParamApiTask {
  data: DataTask | TaskUpdate;
  boardId: string;
  columnId: string;
  taskId: string
}

export interface DataBoardAndColumn {
  column: Column;
  boardId: string
}

export interface ColumnUpdate {
  title: string;
  order: number;
}
