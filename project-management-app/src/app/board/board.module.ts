import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ColumnComponent } from './components/column/column.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { TextBtnDirective } from './directives/text-btn/text-btn.directive';
import { BoardEffects } from './redux/effects/effects.service';
import { reducer } from './redux/reducers/board.reducer';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ColumnsListComponent,
    CreateColumnComponent,
    TextBtnDirective,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('board', reducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardModule { }
