import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { AddBoardComponent } from './components/add-board/add-board.component';

@NgModule({
  declarations: [
    MainComponent,
    BoardsListComponent,
    BoardItemComponent,
    AddBoardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MainModule { }
