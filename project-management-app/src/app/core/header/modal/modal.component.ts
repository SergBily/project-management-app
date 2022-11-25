import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service';
import { AddBoardDialogComponent } from 'src/app/shared/components/add-board-dialog/add-board-dialog.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  letModal = true;


  @Output() hideModal = new EventEmitter<boolean>()

  constructor(public AuthStateService: AuthStateService, private boardsApi: BoardsApiService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  writeEmitter(){
    this.letModal = false
    this.hideModal.emit(this.letModal)
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
