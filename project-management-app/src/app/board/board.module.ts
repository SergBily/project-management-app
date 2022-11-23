import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ColumnComponent } from './components/column/column.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { BoardEffects } from './redux/effects/effects.service';
import { reducer } from './redux/reducers/board.reducer';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskComponent } from './components/task/task.component';
import { CreateColumnDialogComponent } from './components/create-column-dialog/create-column-dialog.component';

const MATERIAL = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
];
@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ColumnsListComponent,
    CreateColumnComponent,
    CreateTaskComponent,
    TaskComponent,
    CreateColumnDialogComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MATERIAL,
    StoreModule.forFeature('board', reducer),
    EffectsModule.forFeature([BoardEffects]),
    DragDropModule,
  ],
})
export class BoardModule { }
