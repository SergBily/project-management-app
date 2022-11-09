import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostBoardRequest } from '../../models/board';
import { BoardsApiService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent {
  public addBoardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
  });

  constructor(private fb: FormBuilder, private boardsApi: BoardsApiService) { }

  addBoard(board: PostBoardRequest) {
    this.boardsApi.addBoard(board).subscribe();
  }
}
