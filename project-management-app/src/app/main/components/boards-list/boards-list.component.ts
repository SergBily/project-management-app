import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';
import { loadMainBoards } from '../../store/actions/main-boards.actions';
import { selectGetMainBoards } from '../../store/selectors/main-boards.selectors';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(
    private boardsApi: BoardsApiService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.boardsApi.getBoards().subscribe((boards) => {
      this.store.dispatch(loadMainBoards({ boards }));
      this.boards$ = this.store.select(selectGetMainBoards);
    });
  }
}
