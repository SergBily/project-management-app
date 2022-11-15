import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';

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
  ) { }

  ngOnInit(): void {
  }

  deleteBoard(event: Event) {
    event.stopPropagation();
    // call modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Are you sure?',
        message: `You are about to delete board ${this.board.title}`,
      },
    });

    // listen to response
    dialogRef.afterClosed().subscribe((dialogResult) => {
    // if user pressed yes dialogResult will be true,
    // if he pressed no - it will be false
      if (dialogResult) this.boardsApi.deleteBoard(this.board.id).pipe(take(1)).subscribe();
    });
  }
}
