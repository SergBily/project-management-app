import {
  animate, style, transition, trigger,
} from '@angular/animations';
import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { DateUserService } from 'src/app/auth/services/date-user/date-user';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetBoardId } from '../../redux/selectors/board.selector';
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
export class CreateTaskComponent implements OnInit, OnDestroy {
  @Input() columnId!: string;

  isCreateTask = false;

  idBoard!: string;

  taskForm!: FormGroup;

  subscription$!: Subscription;

  isValidForm = false;

  constructor(
    private api: ApiBoardService,
    private store: Store,
    private fb: FormBuilder,
    private user: DateUserService,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    });

    this.subscription$ = this.taskForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.isValidForm = true;
      } else {
        this.isValidForm = false;
      }
    });

    this.store.select(selectGetBoardId).pipe(take(1)).subscribe((id) => { this.idBoard = id; });
  }

  onCreateTask(): void {
    const param = {
      boardId: this.idBoard,
      columnId: this.columnId,
      data: {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
