import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable, take,
} from 'rxjs';
import { BoardActions } from './redux/actions/board.actions';
import { selectCountColumns, selectGetColumns } from './redux/selectors/board.selector';
import { Column } from './redux/state.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardId = '';

  title!: string;

  stateColumnsOpenBoard$!: Observable<Column[]>;

  countColumns$!: Observable<number>;

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
      this.countColumns$ = this.store.select(selectCountColumns);
    });
    this.route.queryParams.pipe(take(1)).subscribe((param) => { this.title = param['title']; });
  }
}
