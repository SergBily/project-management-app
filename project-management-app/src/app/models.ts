export interface Board {
  id: string,
  title: string,
  description: string,
}

export interface Column {
  id: string,
  title: string,
  order: number,
}

export interface Task {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
  files: [
    {
      filename: string,
      fileSize: number,
    },
  ]
}
