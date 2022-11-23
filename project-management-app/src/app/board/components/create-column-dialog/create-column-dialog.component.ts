import {
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogData } from 'src/app/shared/components/add-board-dialog/add-dialog.component';

@Component({
  selector: 'app-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit, OnDestroy {
  formColumn!: FormControl;

  isValidForm = false;

  subscription$!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CreateColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.formColumn = new FormControl('', [Validators.required, Validators.maxLength(45)]);
    this.subscription$ = this.formColumn.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.isValidForm = true;
      } else {
        this.isValidForm = false;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
