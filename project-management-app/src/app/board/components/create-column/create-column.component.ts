import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetBoardId } from '../../redux/selectors/board.selector';
import { ApiBoardService } from '../../services/api/api.service';
import { CreateColumnDialogComponent } from '../create-column-dialog/create-column-dialog.component';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
  animations: [
    trigger('openColumnAdd', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.1s'),
      ]),
    ]),
  ],
})
export class CreateColumnComponent implements OnInit, OnDestroy {
  isCreateColumn = false;

  idBoard!: string;

  tForm!: FormControl;

  isValidForm = false;

  subscription$!: Subscription;

  constructor(
    private api: ApiBoardService,
    private store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tForm = new FormControl('', Validators.required);
    this.subscription$ = this.tForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.isValidForm = true;
      } else {
        this.isValidForm = false;
      }
    });

    this.store.select(selectGetBoardId).pipe(take(1)).subscribe((id) => { this.idBoard = id; });
  }

  onCreateColumn(title: string): void {
    this.api.createColumn({ id: this.idBoard, title }).pipe(take(1)).subscribe(
      () => { this.store.dispatch(BoardActions.getColumns()); },
    );
    this.tForm.reset();
    this.isCreateColumn = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateColumnDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onCreateColumn(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
