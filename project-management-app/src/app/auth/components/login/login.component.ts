import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignUpData } from '../../models/auth.models';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;

  isValidForm = false;

  subscription!: Subscription;

  data!: SignUpData;

  constructor(private api: ApiService) { }

  ngOnInit(): void {}

  onSubmit(validTemplate: FormGroup): void {
    this.data = {
      login: validTemplate.get('login')?.value,
      password: validTemplate.get('password')?.value,
    };

    this.subscription = this.api.signIn(this.data).subscribe({
      next: (res) => localStorage.setItem('token', res.token),
      error: (error: HttpErrorResponse) => { this.errorMessage = error.message; },
    });
  }

  getData(validTemplate: FormGroup): void {
    this.isValidForm = validTemplate.status === 'VALID';
  }
}
