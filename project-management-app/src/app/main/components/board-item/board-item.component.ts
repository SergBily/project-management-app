import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardTitleService } from 'src/app/board/services/board-title/board-title.service';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
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
  ) { }

  ngOnInit(): void {
  }

  deleteBoard(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Are you sure?',
        message: `You are about to delete board ${this.board.title}`,
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
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        titleDialog: 'Update board',
        title: this.board.title,
        description: this.board.description,
        button: 'Update',
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
