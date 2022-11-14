import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { BoardActions } from '../../redux/actions/board.actions';
import { selectGetBoardId } from '../../redux/selectors/board.selector';
import { ApiBoardService } from '../../services/api/api.service';

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
export class CreateColumnComponent implements OnInit {
  @Input() typeOfBtnCreate!: string;

  isCreateColumn = false;

  titleForm!: string;

  idBoard!: string;

  constructor(private api: ApiBoardService, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectGetBoardId).pipe(take(1)).subscribe((id) => { this.idBoard = id; });
  }

  onCreateColumn(): void {
    this.api.createColumn({ id: this.idBoard, title: this.titleForm }).subscribe(
      () => { this.store.dispatch(BoardActions.getColumns()); },
    );
  }
}
