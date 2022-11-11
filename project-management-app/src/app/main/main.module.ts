import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { AddBoardComponent } from './components/add-board/add-board.component';

const MATERIAL = [MatCardModule, MatButtonModule, MatIconModule];

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
    MATERIAL,
  ],
})
export class MainModule { }
