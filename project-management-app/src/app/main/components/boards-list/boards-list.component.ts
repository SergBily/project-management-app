import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/add-board-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent {
  boards$: Observable<Board[]> = this.boardsApi.getBoards();

  constructor(
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Create new board:',
        maxLengthDescription: 250,
        maxLengthTitle: 20,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.boardsApi.addBoard(dialogResult)
          .subscribe(() => {
            this.snackBar.open('Board added!', 'OK', {
              duration: 2000,
            });
          });
      }
    });
  }
}
