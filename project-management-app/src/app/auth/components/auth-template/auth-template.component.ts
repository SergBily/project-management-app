import {
  Component, EventEmitter, OnDestroy, OnInit, Output,
} from '@angular/core';
import {
  FormControl, Validators, FormBuilder, FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageError } from '../../models/enum';
import { CustomValidatorService } from '../../services/custom-validator/custom-validator.service';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.scss'],
})
export class AuthTemplateComponent implements OnInit, OnDestroy {
  @Output() formGroup = new EventEmitter<FormGroup>();

  singupForm!: FormGroup;

  isValidForm = false;

  hide = true;

  statusForm!: Subscription;

  constructor(
    private fb: FormBuilder,
    private validators: CustomValidatorService,
  ) { }

  ngOnInit(): void {
    this.singupForm = this.fb.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl(
        '',
        [
          Validators.required,
          this.validators.customValidatorForPassword()],
      ),
    });

    this.statusForm = this.singupForm.statusChanges.subscribe(() => {
      this.formGroup.emit(this.singupForm);
    });
  }

  protected getErrorMessage(nameField: string): MessageError {
    const field = this.singupForm.get(nameField) as FormControl;

    if (field?.hasError('required')) {
      return MessageError.required;
    } if (field?.hasError('hasLettersAndNumbers')) {
      return MessageError.hasLettersAndNumbers;
    } if (field?.hasError('hasMinCharacters')) {
      return MessageError.hasMinCharacters;
    } if (field?.hasError('hasSpecialCharacter')) {
      return MessageError.hasSpecialCharacter;
    }
    return MessageError.hasUpperAndLowercase;
  }

  ngOnDestroy(): void {
    this.statusForm.unsubscribe();
  }
}
