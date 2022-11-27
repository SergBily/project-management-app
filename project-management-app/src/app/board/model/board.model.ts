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
  id?: string;
  files?: TaskFile[];
}

export interface TaskFile {
  filename: string,
  fileSize: number,
}

export interface ParamApiTask {
  boardId: string;
  columnId: string;
  taskId: string
  data?: DataTask | TaskUpdate;
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

export interface DataOfConfirm {
  title: string;
  description: string
}
