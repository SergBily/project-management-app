import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/models';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() board!: Board;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showBoard() {
    this.router.navigate(['boards', this.board.id]);
  }
}
