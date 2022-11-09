import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface PattersRegExp {
  numeric: string,
  special: string,
  latinUpper: string,
  latinLower: string,
}

@Injectable({
  providedIn: 'root',
})

export class CustomValidatorService {
  private minCharacters = 8;

  private patterns: PattersRegExp = {
    numeric: '0-9',
    special: '!,@,#,?,%,^,&,*',
    latinUpper: 'A-Z',
    latinLower: 'a-z',
  };

  constructor() { }

  public customValidatorForPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const hasMinCharacters = !(value.length >= this.minCharacters);
      const hasUpperAndLowercase = !new RegExp(
        `(?=.*[${this.patterns.latinUpper}])(?=.*[${this.patterns.latinLower}])`,
      )
        .test(value);
      const hasLettersAndNumbers = !new RegExp(
        `(?=.*[${this.patterns.latinUpper}${this.patterns.latinLower}])(?=.*[${this.patterns.numeric}])`,
      )
        .test(value);
      const hasSpecialCharacter = !new RegExp(`[${this.patterns.special}]`).test(value);

      if (hasUpperAndLowercase) {
        return { hasUpperAndLowercase };
      } if (hasLettersAndNumbers) {
        return { hasLettersAndNumbers };
      } if (hasSpecialCharacter) {
        return { hasSpecialCharacter };
      } if (hasMinCharacters) {
        return { hasMinCharacters };
      }
      return null;
    };
  }
}
