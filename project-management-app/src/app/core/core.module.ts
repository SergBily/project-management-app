import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatIconModule
  ]
})
export class CoreModule { }
