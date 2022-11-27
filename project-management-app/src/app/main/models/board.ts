export interface Board {
  id: string,
  title: string,
  description: string,
}

export interface PostBoardRequest {
  title: string | null,
  description: string | null,
}

export interface ParamApiBoard {
  boardId: string,
  data: PostBoardRequest
}
