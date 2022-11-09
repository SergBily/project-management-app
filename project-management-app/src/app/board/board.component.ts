import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Board } from '../main/models/board';
import { BoardsApiService } from '../main/services/boards/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardId = '';

  board: Board | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private boardsApi: BoardsApiService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.boardId = params['id'];
    });

    this.boardsApi.getBoard(this.boardId).subscribe((board) => {
      this.board = board;
    });
  }
}
