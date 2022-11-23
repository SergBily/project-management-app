import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable, take,
} from 'rxjs';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { BoardActions } from './redux/actions/board.actions';
import { selectGetColumns } from './redux/selectors/board.selector';
import { Column } from './redux/state.model';

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
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.boardId = params['id'];
      this.store.dispatch(BoardActions.loadOpenBoard({ id: this.boardId }));
      this.stateColumnsOpenBoard$ = this.store.select(selectGetColumns);
    });
    this.route.queryParams.pipe(take(1)).subscribe((param) => { this.title = param['title']; });
  }
}
