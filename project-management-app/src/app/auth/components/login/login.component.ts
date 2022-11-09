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

  checkForm(template: FormGroup): void {
    if (template.status === 'VALID') {
      this.isValidForm = true;
      this.authTemplate = template;
      this.getData();
    } else {
      this.isValidForm = false;
    }
  }

  private getData(): void {
    this.data = {
      login: this.authTemplate.get('login')?.value,
      password: this.authTemplate.get('password')?.value,
    };
  }

  protected onLogout(): void {
    this.authState.setAuthState(false);
    localStorage.removeItem('token');
  }
}
