import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service'; 
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from 'src/app/shared/components/add-board-dialog/add-board-dialog.component';

import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    public AuthStateService: AuthStateService, 
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
    public  ServiceService: ServiceService
    ) {}

    @Output() outEnter = new EventEmitter<string>()

  letModal = false;

  userText: string = ''


  
  ngOnInit(): void {
  }

  hideModal(e: boolean){
    this.letModal = e
  }
   
  openDialog() {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.boardsApi.addBoard(dialogResult).subscribe();
    });
  }

  getText(){
    console.log('text--' + this.userText)
    // this.outEnter.emit(this.userText)

    this.ServiceService.shareUserText = this.userText
    console.log('service--' + this.ServiceService.shareUserText)
    if(this.userText){
    //   return true

    // routerLink="/search"
    }
  }

  delete(){
    this.userText = ''
  }

}



