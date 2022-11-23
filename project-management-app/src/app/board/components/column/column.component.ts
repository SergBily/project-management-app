import {
  Component, Input, OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DataBoardAndColumn, ParamApiColumn, ParamApiTask } from '../../model/board.model';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetTasks } from '../../redux/selectors/board.selector';
import { StateTask } from '../../redux/state.model';
import { ApiBoardService } from '../../services/api/api.service';
import { ValidatorColumnTitleService } from '../../services/custom-validator/validator-column-title.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() dataForApi!: DataBoardAndColumn;

  isChangeTitle = false;

  tasks$!: Observable<StateTask[]>;

  param!: Pick<ParamApiTask, 'boardId' | 'columnId'>;

  titleForm!: FormControl;

  title!: string;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private api: ApiBoardService,
    private customValidator: ValidatorColumnTitleService,
  ) { }

  ngOnInit(): void {
    this.title = this.dataForApi.column.title;
    this.titleForm = new FormControl(
      `${this.title}`,
      [Validators.required, Validators.maxLength(45),
        this.customValidator.customValidatorForColumnTitle(this.title)],
    );

    this.param = {
      boardId: this.dataForApi.boardId, columnId: this.dataForApi.column.id,
    };
    this.store.dispatch(BoardActions.getTasks(this.param));
    this.tasks$ = this.store.select(selectGetTasks(this.dataForApi.column.id));
  }

  deleteBoard(event: Event): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Are you sure?',
        message: `You are about to delete column ${this.dataForApi.column.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.api.deleteColumn(this.param).subscribe(() => {
          this.store.dispatch(BoardActions.getColumns());
        });
      }
    });
  }

  openChangeTitle(): void {
    this.titleForm.setValue(this.title);
    this.onChangeView();
  }

  onChangeView(): void {
    this.isChangeTitle = !this.isChangeTitle;
  }

  changeColumnTitle(): void {
    const param: ParamApiColumn = {
      data: {
        title: this.titleForm.value,
        order: this.dataForApi.column.order,
      },
      boardId: this.dataForApi.boardId,
      columnId: this.dataForApi.column.id,
    };

    this.title = this.titleForm.value;

    this.api.updateColumn(param).subscribe(() => this.onChangeView());
  }
}
