import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { DataBoardAndColumn, TaskUpdate } from '../../model/board.model';
import { BoardActions, DragAndDropActions } from '../../redux/actions/board.actions';
import { selectGetColumns, selectGetTasks, selectGetAllTasks } from '../../redux/selectors/board.selector';
import { Column, StateTask, Tasks } from '../../redux/state.model';
import { ApiBoardService } from '../../services/api/api.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() dataForApi!: DataBoardAndColumn;

  isChangeTitle = false;

  tasks$!: Observable<StateTask[]>;

  allTasks$!: Observable<Tasks>;

  stateColumnsOpenBoard$!: Observable<Column[]>;

  constructor(
    private store: Store,
    private boardsApi: ApiBoardService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(BoardActions.getTasks(
      {
        boardId: this.dataForApi.boardId, columnId: this.dataForApi.column.id,
      },
    ));
    this.tasks$ = this.store.select(selectGetTasks(this.dataForApi.column.id));
    this.stateColumnsOpenBoard$ = this.store.select(selectGetColumns);
    this.allTasks$ = this.store.select(selectGetAllTasks);
  }

  getColumnsId(columnId: string): string[] {
    const columnsId: string[] = [];
    this.stateColumnsOpenBoard$.pipe(
      take(1),
    ).subscribe((columns) => {
      columns.forEach((column) => {
        if (column.id !== columnId) columnsId.push(column.id);
      });
    });
    return columnsId;
  }

  dropTask(event: CdkDragDrop<string[]>) {
    // console.log(event);
    if (event.previousContainer === event.container) {
      // console.log('current');
      this.tasks$.pipe(
        take(1),
      ).subscribe((tasks) => {
        const tasksCopy = tasks.map((task) => ({ ...task }));
        moveItemInArray(tasksCopy, event.previousIndex, event.currentIndex);
        tasksCopy.forEach((task, index) => {
          // eslint-disable-next-line no-param-reassign
          task.order = index + 1;
          const taskDataApi: TaskUpdate = { ...task };
          delete taskDataApi.id;
          delete taskDataApi.files;
          this.boardsApi.updateTask({
            boardId: this.dataForApi.boardId,
            columnId: this.dataForApi.column.id,
            taskId: task.id,
            data: { ...taskDataApi },
          }).subscribe();
        });
        this.store.dispatch(DragAndDropActions.changeTaskPositionInColumn({
          columnId: this.dataForApi.column.id,
          tasks: tasksCopy,
        }));
      });
    } else {
      console.log('other');
    }
  }
}
