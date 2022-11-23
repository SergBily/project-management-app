import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, take } from 'rxjs';
import {
  DataColumn, ParamApiTask, DataTask, TaskUpdate, ColumnUpdate,
} from '../../model/board.model';
import { Column, StateTask } from '../../redux/state.model';

@Injectable({
  providedIn: 'root',
})
export class ApiBoardService {
  constructor(private http: HttpClient) { }

  getColumns(id: string) {
    return this.http.get<Column[]>(`/boards/${id}/columns`)
      .pipe(
        retry(2),
        take(1),
      );
  }

  createColumn(data: DataColumn): Observable<Column> {
    return this.http.post<Column>(`/boards/${data.id}/columns`, { title: data.title })
      .pipe(
        retry(2),
        take(1),
      );
  }

  updateColumn(boardId: string, columnId: string, data: ColumnUpdate) {
    return this.http.put(`/boards/${boardId}/columns/${columnId}`, data).pipe(
      retry(2),
      take(1),
    );
  }

  deleteColumn(param: Pick<ParamApiTask, 'boardId' | 'columnId'>): Observable<null> {
    return this.http.delete<null>(`/boards/${param.boardId}/columns/${param.columnId}`)
      .pipe(
        retry(2),
        take(1),
      );
  }

  createTask(param: Omit<ParamApiTask, 'taskId'>): Observable<DataTask> {
    return this.http.post<DataTask>(
      `/boards/${param.boardId}/columns/${param.columnId}/tasks`,
      param.data,
    )
      .pipe(
        retry(2),
        take(1),
      );
  }

  getTasks(param: Pick<ParamApiTask, 'boardId' | 'columnId'>): Observable<StateTask[]> {
    return this.http.get<StateTask[]>(
      `/boards/${param.boardId}/columns/${param.columnId}/tasks`,
    )
      .pipe(
        retry(2),
        take(1),
      );
  }

  getTask(param: Omit<ParamApiTask, 'data'>): Observable<Task[]> {
    return this.http.get<Task[]>(
      `/boards/${param.boardId}/columns/${param.columnId}/tasks/${param.taskId}`,
    )
      .pipe(
        retry(2),
        take(1),
      );
  }

  deleteTask(param: Omit<ParamApiTask, 'data'>): Observable<null> {
    return this.http.delete<null>(
      `/boards/${param.boardId}/columns/${param.columnId}/tasks/${param.taskId}`,
    )
      .pipe(
        retry(2),
        take(1),
      );
  }

  updateTask(param: ParamApiTask): Observable<TaskUpdate> {
    return this.http.put<TaskUpdate>(
      `/boards/${param.boardId}/columns/${param.columnId}/tasks/${param.taskId}`,
      param.data as TaskUpdate,
    )
      .pipe(
        retry(2),
        take(1),
      );
  }
}
