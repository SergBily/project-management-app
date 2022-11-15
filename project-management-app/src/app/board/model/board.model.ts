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
  id?: string
}

export interface ParamApiTask {
  data: DataTask | TaskUpdate;
  boardId: string;
  columnId: string;
  taskId: string
}
