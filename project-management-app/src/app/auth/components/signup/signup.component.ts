import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl, Validators, FormBuilder, FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageError } from '../../models/enum';
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

  statusForm!: Subscription;

  constructor(private fb: FormBuilder, private validators: CustomValidatorService) { }

  ngOnInit(): void {
    this.singupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.validators.customValidatorForPassword()]),
    });
    this.statusForm = this.singupForm.statusChanges.subscribe((status) => {
      this.isValidForm = status === 'VALID';
    });
  }

  protected getErrorMessage(nameField: string): MessageError {
    const field = this.singupForm.get(nameField);

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

  }

  ngOnDestroy(): void {
    this.statusForm.unsubscribe();
  }
}
