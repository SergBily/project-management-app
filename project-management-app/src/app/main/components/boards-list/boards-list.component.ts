import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  boards$: Observable<Board[]> = this.boardsApi.getBoards();

  constructor(private boardsApi: BoardsApiService) { }

  ngOnInit(): void {
  }
}
