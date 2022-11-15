import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { DateUserService } from 'src/app/auth/services/date-user/date-user';
import { BoardActions } from '../../redux/actions/board.actions';
// import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetBoardId } from '../../redux/selectors/board.selector';
import { ApiBoardService } from '../../services/api/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  animations: [
    trigger('openTaskAdd', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.1s'),
      ]),
    ]),
  ],
})
export class CreateTaskComponent implements OnInit {
  @Input() columnId!: string;

  isCreateTask = false;

  titleForm!: string;

  idBoard!: string;

  taskForm!: FormGroup;

  constructor(
    private api: ApiBoardService,
    private store: Store,
    private fb: FormBuilder,
    private user: DateUserService,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
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
}
