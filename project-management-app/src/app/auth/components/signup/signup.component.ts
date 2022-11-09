import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { SignUpData } from '../../models/auth.models';
import { ApiService } from '../../services/api/api.service';
import { MessageError } from '../../models/enum';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  isValidForm = false;

  nameControl!: FormControl;

  errorMessage!: string;

  successMessage!: string;

  data!: SignUpData;

  authTemplate!: FormGroup;

  constructor(
    private api: ApiService,
    private check: CheckFormService,
    private dataForm: DataFormService,
  ) { }

  ngOnInit(): void {
    this.nameControl = new FormControl('', [Validators.required]);
  }

  protected onSubmit(): void {
    this.api.signUp(this.data)
      .subscribe({
        next: (res) => localStorage.setItem('user', JSON.stringify(res)),
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

  protected checkForm(template: FormGroup) {
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
