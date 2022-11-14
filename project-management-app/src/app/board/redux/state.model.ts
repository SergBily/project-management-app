export interface StateBoard {
  columnsOpenBoard: Column[];
  tasks: Task[];
  idOpenBoard: string;
}

export interface Column {
  id: string;
  title: string;
  order: number
}

interface Task {
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
