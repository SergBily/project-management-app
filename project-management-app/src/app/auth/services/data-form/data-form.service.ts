import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignUpData } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class DataFormService {
  constructor() { }

  public getData(authTemplate: FormGroup, name?: FormControl): SignUpData {
    return name
      ? {
        name: name?.value,
        login: authTemplate.get('login')?.value,
        password: authTemplate.get('password')?.value,
      }
      : {
        login: authTemplate.get('login')?.value,
        password: authTemplate.get('password')?.value,
      };
  }
}
