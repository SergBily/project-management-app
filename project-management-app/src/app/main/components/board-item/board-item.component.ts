import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router,
    private boardsApi: BoardsApiService,
  ) { }

  ngOnInit(): void {
  }

  showBoard() {
    this.router.navigate(['boards', this.board.id]);
  }

  deleteBoard() {
    this.boardsApi.deleteBoard(this.board.id).subscribe((res) => console.log(res));
  }
}
