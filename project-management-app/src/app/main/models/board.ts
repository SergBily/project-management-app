export interface Board {
  id: string,
  title: string,
  description: string,
}

export interface PostBoardRequest {
  title: string | null,
  description: string | null,
}
