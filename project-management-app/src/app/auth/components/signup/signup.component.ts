import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpData } from '../../models/auth.models';
import { ApiAuthService } from '../../services/api/api.service';
import { MessageError } from '../../models/enum';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';
import { UrlService } from '../../services/url/url.service';

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
    private api: ApiAuthService,
    private check: CheckFormService,
    private dataForm: DataFormService,
    private router: Router,
    public url: UrlService,
  ) { }

  ngOnInit(): void {
    this.nameControl = new FormControl('', [Validators.required]);
  }

  protected onSubmit(): void {
    this.api.signUp(this.data)
      .subscribe({
        error: () => {
          this.successMessage = '';
          this.errorMessage = MessageError.badResponseSignup;
        },
        complete: () => {
          this.errorMessage = '';
          this.authTemplate.reset();
          this.nameControl.reset();
          this.router.navigate(['/auth/signin']);
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
