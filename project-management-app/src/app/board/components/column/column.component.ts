/* eslint-disable no-param-reassign */
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { DataBoardAndColumn, TaskUpdate } from '../../model/board.model';
import { BoardActions, DragAndDropActions } from '../../redux/actions/board.actions';
import { selectGetColumns, selectGetTasks } from '../../redux/selectors/board.selector';
import { Column, StateTask } from '../../redux/state.model';
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
    if (event.previousContainer === event.container) {
      this.tasks$.pipe(
        take(1),
      ).subscribe((tasks) => {
        const tasksCopy = tasks.map((task) => ({ ...task }));
        moveItemInArray(tasksCopy, event.previousIndex, event.currentIndex);
        tasksCopy.forEach((task, index) => {
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
    }

    if (event.previousContainer !== event.container) {
      const previousTasks$ = this.store.select(selectGetTasks(event.previousContainer.id));
      previousTasks$.pipe(
        take(1),
      ).subscribe((tasks) => {
        const previousTasksCopy = tasks.map((task) => ({ ...task }));
        const currentTasks$ = this.store.select(selectGetTasks(event.container.id));
        let currentTasksCopy!: StateTask[];
        currentTasks$.pipe(
          take(1),
        ).subscribe((currentTasks) => {
          currentTasksCopy = currentTasks.map((task) => ({ ...task }));
        });
        transferArrayItem(
          previousTasksCopy,
          currentTasksCopy,
          event.previousIndex,
          event.currentIndex,
        );

        previousTasksCopy.forEach((task, index) => {
          task.order = index + 1;
          const taskDataApi: TaskUpdate = { ...task };
          delete taskDataApi.id;
          delete taskDataApi.files;
          this.boardsApi.updateTask({
            boardId: this.dataForApi.boardId,
            columnId: task.columnId,
            taskId: task.id,
            data: { ...taskDataApi },
          }).subscribe();
        });
        this.store.dispatch(DragAndDropActions.changeTaskPositionInColumn({
          columnId: event.previousContainer.id,
          tasks: previousTasksCopy,
        }));

        currentTasksCopy.forEach((task, index) => {
          task.order = index + 1;
          const taskDataApi: TaskUpdate = { ...task };
          delete taskDataApi.id;
          delete taskDataApi.files;
          this.boardsApi.updateTask({
            boardId: this.dataForApi.boardId,
            columnId: task.columnId,
            taskId: task.id,
            data: { ...taskDataApi, columnId: event.container.id },
          }).subscribe();
          if (task.columnId !== event.container.id) task.columnId = event.container.id;
        });
        this.store.dispatch(DragAndDropActions.changeTaskPositionInColumn({
          columnId: event.container.id,
          tasks: currentTasksCopy,
        }));
      });
    }
  }
}
