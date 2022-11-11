import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ColumnComponent } from './components/column/column.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ColumnsListComponent,
    CreateColumnComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class BoardModule { }
