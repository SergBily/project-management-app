import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardTitleService } from 'src/app/board/services/board-title/board-title.service';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Board, ParamApiBoard, PostBoardRequest } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';
import { deleteMainBoard, updateMainBoard } from '../../store/actions/main-boards.actions';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() board!: Board;

  constructor(
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
    private store: Store,
    private snackBar: MatSnackBar,
    private boardTitle: BoardTitleService,
    public translate: TranslateService,
  ) { }

  titleUpdateDialog: string;

  buttonUpdateName: string;

  titleDeleteDialog: string;

  messageDeleteDialog: string;

  ngOnInit(): void {
  }

  deleteBoard(event: Event) {
    event.stopPropagation();
    this.translate.get('areYouSure').subscribe((res: string) => {
      this.titleDeleteDialog = res;
    });
    this.translate.get('deleteMessage').subscribe((res: string) => {
      this.messageDeleteDialog = res;
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: this.titleDeleteDialog,
        message: `${this.messageDeleteDialog} ${this.board.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.boardsApi.deleteBoard(this.board.id)
          .subscribe(() => {
            this.store.dispatch(deleteMainBoard({ id: this.board.id }));
            this.snackBar.open('Board deleted', 'OK', {
              duration: 2000,
            });
          });
      }
    });
  }

  updateBoard(event: Event) {
    event.stopPropagation();
    this.translate.get('updateBoard').subscribe((res: string) => {
      this.titleUpdateDialog = res;
    });
    this.translate.get('update').subscribe((res: string) => {
      this.buttonUpdateName = res;
    });
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        titleDialog: this.titleUpdateDialog,
        title: this.board.title,
        description: this.board.description,
        button: this.buttonUpdateName,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult: PostBoardRequest) => {
      if (dialogResult) {
        const param: ParamApiBoard = {
          boardId: this.board.id,
          data: {
            title: dialogResult.title,
            description: dialogResult.description,
          },
        };

        this.boardsApi.updateBoard(param)
          .subscribe(() => {
            this.store.dispatch(updateMainBoard());
          });
      }
    });
  }

  getTitleOpenBoard(title: string): void {
    this.boardTitle.setTitleBoard(title);
  }
}
