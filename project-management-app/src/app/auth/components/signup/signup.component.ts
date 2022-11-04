import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormBuilder, FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageError } from '../../models/enum';
import { SignUpData } from '../../models/auth.models';
import { ApiService } from '../../services/api/api.service';
import { CustomValidatorService } from '../../services/custom-validator/custom-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit, OnDestroy {
  hide = true;

  isValidForm = false;

  singupForm!: FormGroup;

  subscription: Subscription[] = [];

  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private validators: CustomValidatorService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.singupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.validators.customValidatorForPassword()]),
    });

    const statusForm: Subscription = this.singupForm.statusChanges.subscribe((status) => {
      this.isValidForm = status === 'VALID';
    });
    this.subscription.push(statusForm);
  }

  protected getErrorMessage(nameField: string): MessageError {
    const field = this.singupForm.get(nameField) as FormControl;

    if (field?.hasError('required')) {
      return MessageError.required;
    } if (field?.hasError('email')) {
      return MessageError.email;
    } if (field?.hasError('hasLettersAndNumbers')) {
      return MessageError.hasLettersAndNumbers;
    } if (field?.hasError('hasMinCharacters')) {
      return MessageError.hasMinCharacters;
    } if (field?.hasError('hasSpecialCharacter')) {
      return MessageError.hasSpecialCharacter;
    }
    return MessageError.hasUpperAndLowercase;
  }

  onSubmit(): void {
    const data: SignUpData = {
      name: this.singupForm.get('name')?.value,
      login: this.singupForm.get('email')?.value,
      password: this.singupForm.get('password')?.value,
    };

    const response: Subscription = this.api.signUp(data).subscribe(
      (res) => localStorage.setItem('signup', JSON.stringify(res)),
      (error: HttpErrorResponse) => { this.errorMessage = error.message; },
    );

    this.subscription.push(response);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
