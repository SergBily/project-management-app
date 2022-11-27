import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DateUserService } from 'src/app/auth/services/date-user/date-user';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DataOfConfirm, ParamApiTask } from '../../model/board.model';
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

  param!: ParamApiTask;

  titleDeleteDialog: string;

  messageDeleteDialog: string;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private api: ApiBoardService,
    private userData: DateUserService,
    public translate: TranslateService,
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
    this.translate.get('areYouSure').subscribe((res: string) => {
      this.titleDeleteDialog = res;
    });
    this.translate.get('deleteTaskMessage').subscribe((res: string) => {
      this.messageDeleteDialog = res;
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: this.titleDeleteDialog,
        message: `${this.messageDeleteDialog} ${this.task.title}`,
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

  updateTask() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        titleDialog: 'Update task',
        title: this.task.title,
        description: this.task.description,
        button: 'Update',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult: DataOfConfirm) => {
      if (dialogResult) {
        this.param.data = {
          title: dialogResult.title,
          description: dialogResult.description,
          order: this.task.order,
          boardId: this.task.boardId,
          columnId: this.task.columnId,
          userId: this.userData.getloginedUserId(),
        };

        this.api.updateTask(this.param).subscribe(() => {
          this.store.dispatch(BoardActions.getTasks({
            boardId: this.task.boardId, columnId: this.task.columnId,
          }));
        });
      }
    });
  }
}
