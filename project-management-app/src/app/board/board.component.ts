import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable, take,
} from 'rxjs';
import { BoardActions, DragAndDropActions } from './redux/actions/board.actions';
import { selectGetBoards } from './redux/selectors/board.selector';
import { Column } from './redux/state.model';
import { ApiBoardService } from './services/api/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardId = '';

  stateColumnsOpenBoard$!: Observable<Column[]>;

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
      this.stateColumnsOpenBoard$ = this.store.select(selectGetBoards);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
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
            .updateColumn(this.boardId, column.id, {
              title: column.title,
              order: column.order,
            })
            .subscribe();
        });
        this.store.dispatch(DragAndDropActions.changeColumnPosition({ columns: columnsCopy }));
      });
  }
}
