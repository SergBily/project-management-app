import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/add-board-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from 'src/app/main/models/board';
import { addMainBoard } from 'src/app/main/store/actions/main-boards.actions';
import { Store } from '@ngrx/store';

import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  constructor(
    public authStateService: AuthStateService,
    private boardsApi: BoardsApiService,
    public dialog: MatDialog,
    public  ServiceService: ServiceService,
    private snackBar: MatSnackBar,
    private store: Store,
  ) {}

    @Output() outEnter = new EventEmitter<string>()

  letModal = false;

  userText: string = ''


  
  ngOnInit(): void {
  }
  
  
  
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
          .subscribe((board: Board) => {
            this.store.dispatch(addMainBoard({ board }));
            this.snackBar.open('New board added!', 'OK', {
              duration: 2000,
            });
          });
      }
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
