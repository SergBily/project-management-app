import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() board!: Board;

  constructor(
    private boardsApi: BoardsApiService,
  ) { }

  ngOnInit(): void {
  }

  deleteBoard(event: Event) {
    event.stopPropagation();
    this.boardsApi.deleteBoard(this.board.id).pipe(take(1)).subscribe();
  }
}
