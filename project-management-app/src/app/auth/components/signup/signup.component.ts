import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import {
  FormControl, Validators, FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUpData } from '../../models/auth.models';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit, OnDestroy {
  isValidForm = false;

  nameControl!: FormControl;

  subscription!: Subscription;

  errorMessage!: string;

  statusForm!: Subscription;

  data!: SignUpData;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.nameControl = new FormControl('', [Validators.required]);
  }

  onSubmit(): void {
    this.subscription = this.api.signUp(this.data).subscribe({
      next: (res) => localStorage.setItem('signup', JSON.stringify(res)),
      error: (error: HttpErrorResponse) => { this.errorMessage = error.message; },
    });
  }

  checkLoginAndPasswordFields(validTemplate: FormGroup): void {
    this.data = {
      name: this.nameControl?.value,
      login: validTemplate.get('login')?.value,
      password: validTemplate.get('password')?.value,
    };

    if (!this.nameControl.errors) {
      this.isValidForm = !this.isValidForm;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
