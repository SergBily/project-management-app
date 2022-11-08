import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { retry, take } from 'rxjs';
import { SignUpData } from '../../models/auth.models';
import { MessageError } from '../../models/enum';
import { ApiService } from '../../services/api/api.service';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';
import { DateUserService } from '../../services/user-date/date-user';

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

  constructor(
    private api: ApiService,
    private check: CheckFormService,
    private dataForm: DataFormService,
    private userId: DateUserService,
  ) { }

  ngOnInit(): void {
    const id = this.userId.getloginedUserId();
    this.nameControl = new FormControl('', [Validators.required]);

    this.api.getUser(id).subscribe((user) => {
      this.loginUser = user.login;
      this.nameControl.setValue(user.name);
    });
  }

  protected onUpdate(): void {
    this.api.signUp(this.data)
      .pipe(
        retry(2),
        take(1),
      )
      .subscribe({
        next: (res) => localStorage.setItem('userId', res.id),
        error: () => {
          this.successMessage = '';
          this.errorMessage = MessageError.badResponseSignup;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = MessageError.successResponse;
          this.authTemplate.reset();
          this.nameControl.reset();
        },
      });
  }

  protected onDelete() {

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
