import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'board', loadChildren: () => import('./pages/board/board.module').then((m) => m.BoardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
