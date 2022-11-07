import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { boards } from 'src/app/mock';
import { Board } from 'src/app/models';

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
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.boardId = params['id'];
      }),
    );

    this.board = boards.find((item) => item.id === this.boardId);
    if (!this.board) {
      this.router.navigate(['page-not-found']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
