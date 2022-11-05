import { Component, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { take, retry } from 'rxjs';
import { SignUpData } from '../../models/auth.models';
import { ApiService } from '../../services/api/api.service';
import { MessageError } from '../../models/enum';

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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.nameControl = new FormControl('', [Validators.required]);
  }

  onSubmit(): void {
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

  checkForm(template: FormGroup): void {
    if (!this.nameControl.errors && template.status === 'VALID') {
      this.isValidForm = true;
      this.authTemplate = template;
      this.getData();
    } else {
      this.isValidForm = false;
    }
  }

  private getData(): void {
    this.data = {
      name: this.nameControl?.value,
      login: this.authTemplate.get('login')?.value,
      password: this.authTemplate.get('password')?.value,
    };
  }
}
