import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  title: string;
  description: string;
  maxLengthDescription: number;
  maxLengthTitle: number;
}

@Component({
  selector: 'app-add-board-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  public addBoardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(this.data.maxLengthTitle)]],
    description: ['',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(this.data.maxLengthDescription)]],
  });

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
