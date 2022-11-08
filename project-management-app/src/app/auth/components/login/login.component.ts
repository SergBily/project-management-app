import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SignUpData } from '../../models/auth.models';
import { MessageError } from '../../models/enum';
import { ApiService } from '../../services/api/api.service';
import { AuthStateService } from '../../services/auth-state/auth-state.service';
import { CheckFormService } from '../../services/check-form/check-form.service';
import { DataFormService } from '../../services/data-form/data-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  errorMessage!: string;

  successMessage!: string;

  isValidForm = false;

  data!: SignUpData;

  authTemplate!: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    public authState: AuthStateService,
    private check: CheckFormService,
    private dataForm: DataFormService,
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.api.signIn(this.data)
      .pipe(take(1))
      .subscribe({
        next: (res) => localStorage.setItem('token', res.token),
        error: () => {
          this.successMessage = '';
          this.errorMessage = MessageError.badResponse;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = MessageError.successResponse;
          this.authState.setAuthState(true);
          this.authTemplate.reset();
          this.router.navigate(['/main/boards']);
        },
      });
  }

  protected checkForm(template: FormGroup): void {
    const isValid = this.check.checkForm(template);

    if (isValid) {
      this.data = this.dataForm.getData(template);
      this.isValidForm = isValid;
      this.authTemplate = template;
    } else {
      this.isValidForm = isValid;
    }
  }

  protected onLogout(): void {
    this.authState.setAuthState(false);
    localStorage.removeItem('token');
  }
}
