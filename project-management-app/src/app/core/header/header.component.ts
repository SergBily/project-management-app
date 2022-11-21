import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { HeaderService } from '../services/header.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service'; 
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from 'src/app/shared/components/add-board-dialog/add-board-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    public AuthStateService: AuthStateService, 
    public HeaderService: HeaderService,
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
  }
  
  letModal = false;
  

  show() {
    return this.AuthStateService.getCurrentState()
  }

  showModal(){
    console.log(document.documentElement)
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.boardsApi.addBoard(dialogResult).subscribe();
    });
  }
 
}



