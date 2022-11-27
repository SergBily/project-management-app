import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { BoardsApiService } from 'src/app/main/services/boards/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from 'src/app/main/models/board';
import { addMainBoard } from 'src/app/main/store/actions/main-boards.actions';
import { Store } from '@ngrx/store';
import { UrlService } from 'src/app/auth/services/url/url.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangLocalStorageService } from '../services/lang-local-storage/lang-local-storage.service';

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
    private langLS: LangLocalStorageService,
  ) {}

  titleDialog: string;

  buttonName: string;

  ngOnInit(): void {
    this.translate.use(this.getCurrentLang());
  }

  letModal = false;

  openDialog() {
    this.translate.get('createNewBoard').subscribe((res: string) => {
      this.titleDialog = res;
    });
    this.translate.get('add').subscribe((res: string) => {
      this.buttonName = res;
    });
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {
        titleDialog: this.titleDialog,
        button: this.buttonName,
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
    this.langLS.setLang(lang);
  }

  getCurrentLang(): string {
    if (this.langLS.getLang() === null) {
      return this.translate.defaultLang;
    }
    return this.langLS.getLang() as string;
  }
}
