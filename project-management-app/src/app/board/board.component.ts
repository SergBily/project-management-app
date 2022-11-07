import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from '../main/models/board';
import { BoardsApiService } from '../main/services/boards/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId = '';

  board: Board | undefined;

  subscriptions: Subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private boardsApi: BoardsApiService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.boardId = params['id'];
      }),
    );

    this.subscriptions.add(
      this.boardsApi.getBoard(this.boardId).subscribe((board) => {
        this.board = board;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
