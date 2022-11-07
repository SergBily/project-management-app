import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent {
  public addBoardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
  });

  public title = this.addBoardForm.controls.title;

  public description = this.addBoardForm.controls.description;

  constructor(private fb: FormBuilder) { }

  addBoard(board: any) {
    console.log(board);
  }

  isValid(field: FormControl) {
    const { invalid, dirty, touched } = field;
    return invalid && (dirty || touched);
  }
}
