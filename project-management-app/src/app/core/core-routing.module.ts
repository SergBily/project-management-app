import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { MainComponent } from './main/main.component';
import { TeamComponent } from './main/team/team.component';

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
