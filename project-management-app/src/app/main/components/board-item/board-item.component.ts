import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() board!: Board;

  constructor() { }

  ngOnInit(): void {
  }
}
