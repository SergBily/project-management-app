import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGetTasks } from '../../redux/selectors/board.selector';
import { Column, StateTask } from '../../redux/state.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;

  isChangeTitle = false;

  tasks$!: Observable<StateTask[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectGetTasks(this.column.id));
  }
}
