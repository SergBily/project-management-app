import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { HeaderService } from './services/header.service';
import { MainComponent } from './main/main.component';
import { CardComponent } from './main/card/card.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatIconModule
  ],
  providers: [HeaderService],
  exports: [
    HeaderComponent,
    MainComponent,
    // CardComponent
    // CoreComponent
    FooterComponent
  ]
})
export class CoreModule { }
