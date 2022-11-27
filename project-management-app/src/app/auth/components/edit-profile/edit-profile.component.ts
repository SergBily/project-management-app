import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SignUpData } from '../../models/auth.models';
import { MessageError } from '../../models/enum';
import { ApiAuthService } from '../../services/api/api.service';
import { AuthStateService } from '../../services/auth-state/auth-state.service';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';
import { DateUserService } from '../../services/date-user/date-user';
import { UrlService } from '../../services/url/url.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  isValidForm = false;

  nameControl!: FormControl;

  data!: SignUpData;

  authTemplate!: FormGroup;

  errorMessage!: string;

  loginUser!: string;

  currentUserId!: string;

  queryParam!: string;

  constructor(
    private api: ApiAuthService,
    private check: CheckFormService,
    private dataForm: DataFormService,
    private userId: DateUserService,
    private router: Router,
    private statusUser: AuthStateService,
    public url: UrlService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.userId.getloginedUserId();
    this.nameControl = new FormControl('', [Validators.required]);

    this.api.getUser(this.currentUserId).subscribe((user) => {
      this.loginUser = user.login;
      this.nameControl.setValue(user.name);
    });
  }

  protected onUpdate(): void {
    this.api.updateUser(this.currentUserId, this.data)
      .subscribe({
        next: (res) => localStorage.setItem('userId', res.id),
        error: () => {
          this.errorMessage = MessageError.badResponseSignup;
        },
        complete: () => {
          this.errorMessage = '';
          this.url.getChanhedPreviousUrl().pipe(take(1)).subscribe((url) => this.router.navigate([url]));
          this.snackBar.open(MessageError.updateSuccess, 'OK', {
            duration: 2000,
          });
        },
      });
  }

  protected onDelete() {
    this.api.deleteUser(this.currentUserId)
      .subscribe({
        error: () => {
          this.errorMessage = MessageError.deleteUserError;
        },
        complete: () => {
          this.errorMessage = '';
          localStorage.removeItem('token');
          this.statusUser.setAuthState(false);
          this.router.navigate(['/']);
          this.snackBar.open(MessageError.successResponse, 'OK', {
            duration: 2000,
          });
        },
      });
  }

  protected checkForm(template: FormGroup): void {
    const isValid = this.check.checkForm(template, this.nameControl);
    if (isValid) {
      this.data = this.dataForm.getData(template, this.nameControl);
      this.isValidForm = isValid;
      this.authTemplate = template;
    } else {
      this.isValidForm = isValid;
    }
  }
}
