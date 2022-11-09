import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ColumnComponent } from './components/column/column.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ColumnsListComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
  ],
})
export class BoardModule { }
