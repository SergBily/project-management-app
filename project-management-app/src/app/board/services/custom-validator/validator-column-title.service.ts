import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorColumnTitleService {
  constructor() { }

  public customValidatorForColumnTitle(curTitle: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      if (value === curTitle) {
        return { currentTitle: true };
      }

      return null;
    };
  }
}
