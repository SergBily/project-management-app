import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { CardComponent } from './main/card/card.component';
import { FooterComponent } from './footer/footer.component';
import { TeamComponent } from './main/team/team.component';
import { ModalComponent } from './header/modal/modal.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service/service.service';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    FooterComponent,
    TeamComponent,
    ModalComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  exports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ModalComponent,
    SearchComponent,
    HttpClientModule    
  ]
})
export class CoreModule { }
