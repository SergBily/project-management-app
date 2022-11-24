import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';
import { deleteMainBoard } from '../../store/actions/main-boards.actions';

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
}
