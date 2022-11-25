import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { SignUpData } from '../../models/auth.models';
import { MessageError } from '../../models/enum';
import { ApiAuthService } from '../../services/api/api.service';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';
import { DateUserService } from '../../services/date-user/date-user';

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

  successMessage!: string;

  errorMessage!: string;

  loginUser!: string;

  currentUserId!: string;

  constructor(
    private api: ApiAuthService,
    private check: CheckFormService,
    private dataForm: DataFormService,
    private userId: DateUserService,
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
          this.successMessage = '';
          this.errorMessage = MessageError.badResponseSignup;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = MessageError.updateSuccess;
        },
      });
  }

  protected onDelete() {
    this.api.deleteUser(this.currentUserId)
      .subscribe({
        error: () => {
          this.successMessage = '';
          this.errorMessage = MessageError.deleteUserError;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = MessageError.successResponse;
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
