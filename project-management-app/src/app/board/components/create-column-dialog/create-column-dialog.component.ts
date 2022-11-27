import {
  Component, Inject, OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from 'src/app/shared/components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit {
  formColumn!: FormControl;

  constructor(
    public dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.formColumn = new FormControl(
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(45)],
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getErrorMessage(): string {
    if (this.formColumn.hasError('required')) {
      return 'That field is required';
    } if (this.formColumn.hasError('minlength')) {
      return 'min length 3 character';
    }
    return 'Max length 45 character';
  }
}
