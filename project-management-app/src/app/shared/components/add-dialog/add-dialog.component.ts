import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  titleDialog: string;
  button: string
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-add-board-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  public addBoardForm = this.fb.group({
    title: [this.data.title, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    description: [this.data.description,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150)]],
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
