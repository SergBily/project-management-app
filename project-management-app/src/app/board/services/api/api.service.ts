import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, take } from 'rxjs';
import { DataColumn } from '../../model/data-column.model';
import { Column } from '../../redux/state.model';

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
}
