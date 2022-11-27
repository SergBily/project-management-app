export interface StateBoard {
  columns: Column[];
  tasks: Tasks;
  idOpenBoard: string;
}

export interface Column {
  id: string;
  title: string;
  order: number
}

export interface StateTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  file: File[];
}

interface File {
  filename: string;
  fileSize: number;
}

export interface Tasks {
  [propName: string]: StateTask[]
}
