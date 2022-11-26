import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/add-board-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from 'src/app/main/models/board';
import { addMainBoard } from 'src/app/main/store/actions/main-boards.actions';
import { Store } from '@ngrx/store';
import { UrlService } from 'src/app/auth/services/url/url.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private snackBar: MatSnackBar,
    private store: Store,
    public url: UrlService,
    private router: Router,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
  }

  letModal = false;

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
            this.router.navigate(['/main']);
            this.snackBar.open('New board added!', 'OK', {
              duration: 2000,
            });
          });
      }
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
