import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardItemComponent } from './components/board-item/board-item.component';

@NgModule({
  declarations: [
    MainComponent,
    BoardsListComponent,
    BoardItemComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
