import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { BoardActions, DragAndDropActions } from './redux/actions/board.actions';
import { selectGetColumns } from './redux/selectors/board.selectors';
import { Column } from './redux/state.model';
import { ApiBoardService } from './services/api/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('animateTitleBoard', [
      transition('void => *', [
        style({ transform: 'translateX(50%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('animateBoard', [
      transition('void => *', [
        style({ transform: 'translateX(-50%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class BoardComponent implements OnInit {
  boardId = '';

  title!: string;

  stateColumnsOpenBoard$!: Observable<Column[]>;

  countColumns$!: Observable<number>;

  timeStampAnimate = 50;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store,
    private boardsApi: ApiBoardService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.boardId = params['id'];
      this.store.dispatch(BoardActions.loadOpenBoard({ id: this.boardId }));
      this.stateColumnsOpenBoard$ = this.store.select(selectGetColumns);
    });

    this.route.queryParams.pipe(take(1)).subscribe((param) => {
      this.title = param['title'];
    });
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    this.stateColumnsOpenBoard$.pipe(
      take(1),
    )
      .subscribe((columns) => {
        const columnsCopy = columns.map((column) => ({ ...column }));
        moveItemInArray(columnsCopy, event.previousIndex, event.currentIndex);
        columnsCopy.forEach((column, index) => {
          // eslint-disable-next-line no-param-reassign
          column.order = index + 1;
          this.boardsApi
            .updateColumn({
              boardId: this.boardId,
              columnId: column.id,
              data: {
                title: column.title,
                order: column.order,
              },
            })
            .subscribe();
        });
        this.store.dispatch(DragAndDropActions.changeColumnPosition({ columns: columnsCopy }));
      });
  }
}
