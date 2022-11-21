import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from 'src/app/shared/components/add-board-dialog/add-board-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  constructor(
    public AuthStateService: AuthStateService,
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  letModal = false;

  openDialog() {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.boardsApi.addBoard(dialogResult).subscribe();
    });
  }
}
