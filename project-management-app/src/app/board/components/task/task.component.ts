import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ParamApiTask } from '../../model/board.model';
import { BoardActions } from '../../redux/actions/board.actions';
import { StateTask } from '../../redux/state.model';
import { ApiBoardService } from '../../services/api/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: StateTask;

  param!:Omit<ParamApiTask, 'data'>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private api: ApiBoardService,
  ) { }

  ngOnInit(): void {
    this.param = {
      boardId: this.task.boardId,
      columnId: this.task.columnId,
      taskId: this.task.id,
    };
  }

  deleteTask(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Are you sure?',
        message: `You are about to delete task ${this.task.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.api.deleteTask(this.param).subscribe(() => {
          this.store.dispatch(BoardActions.getTasks({
            boardId: this.task.boardId, columnId: this.task.columnId,
          }));
        });
      }
    });
  }
}
