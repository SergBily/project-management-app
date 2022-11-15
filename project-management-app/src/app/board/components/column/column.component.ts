import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataBoardAndColumn } from '../../model/board.model';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetTasks } from '../../redux/selectors/board.selector';
import { StateTask } from '../../redux/state.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() dataForApi!: DataBoardAndColumn;

  isChangeTitle = false;

  tasks$!: Observable<StateTask[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(BoardActions.getTasks(
      {
        boardId: this.dataForApi.boardId, columnId: this.dataForApi.column.id,
      },
    ));
    this.tasks$ = this.store.select(selectGetTasks(this.dataForApi.column.id));
  }
}
