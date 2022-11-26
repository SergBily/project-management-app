import {
  animate, style, transition, trigger,
} from '@angular/animations';
import {
  Component, Input, OnInit,
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { DateUserService } from 'src/app/auth/services/date-user/date-user';
import { AddDialogComponent } from 'src/app/shared/components/add-board-dialog/add-dialog.component';
import { DataOfConfirm } from '../../model/board.model';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetBoardId } from '../../redux/selectors/board.selectors';
import { ApiBoardService } from '../../services/api/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  animations: [
    trigger('openTaskAdd', [
      transition('void => *', [
        style({ transform: 'translateY(10%)' }),
        animate('100ms', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class CreateTaskComponent implements OnInit {
  @Input() columnId!: string;

  isCreateTask = false;

  idBoard!: string;

  taskForm!: FormGroup;

  constructor(
    private api: ApiBoardService,
    private store: Store,
    private fb: FormBuilder,
    private user: DateUserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: new FormControl(
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(45)],
      ),
      description: new FormControl(
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(150)],
      ),
    });

    this.store.select(selectGetBoardId).pipe(take(1)).subscribe((id) => { this.idBoard = id; });
  }

  onCreateTask(data?: DataOfConfirm): void {
    const param = {
      boardId: this.idBoard,
      columnId: this.columnId,
      data: {
        title: data ? data.title : this.taskForm.get('title')?.value,
        description: data ? data.description : this.taskForm.get('description')?.value,
        userId: this.user.getloginedUserId(),
      },
    };

    this.api.createTask(param).subscribe(
      () => {
        this.store.dispatch(BoardActions.getTasks({
          boardId: this.idBoard, columnId: this.columnId,
        }));
      },
    );
    this.taskForm.reset();
    this.isCreateTask = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      maxWidth: '500px',
      data: {
        title: 'Create new task:',
        maxLengthDescription: 150,
        maxLengthTitle: 45,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onCreateTask(result);
      }
    });
  }
}
