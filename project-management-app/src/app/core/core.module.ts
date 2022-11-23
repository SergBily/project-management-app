import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardComponent } from './main/card/card.component';
import { FooterComponent } from './footer/footer.component';
import { TeamComponent } from './main/team/team.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    FooterComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatIconModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
