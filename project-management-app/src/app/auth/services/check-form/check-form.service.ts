import { Injectable } from '@angular/core';
import {
  FormControl, FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckFormService {
  constructor() { }

  public checkForm(template: FormGroup, name?: FormControl): boolean {
    if (name) {
      if (!name.errors && template.status === 'VALID') {
        return true;
      }
      return false;
    }
    if (template.status === 'VALID') {
      return true;
    }
    return false;
  }
}
