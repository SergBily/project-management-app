import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from 'src/app/shared/components/add-board-dialog/add-board-dialog.component';
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
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.boardsApi.addBoard(dialogResult).subscribe();
    });
  }
}
