import { Component, OnInit } from '@angular/core';
import { boards } from 'src/app/mock';
import { Board } from 'src/app/models';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  boards: Board[] = boards;

  constructor() { }

  ngOnInit(): void {
  }
}
