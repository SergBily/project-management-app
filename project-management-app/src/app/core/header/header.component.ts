import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/auth/services/auth-state/auth-state.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public AuthStateService: AuthStateService, public HeaderService: HeaderService) {
    
  }

  ngOnInit(): void {
  }
  
  letModal = false

  show() {
    return this.AuthStateService.getCurrentState()
  }

  showModal(){
    console.log(document.documentElement)
  }
 
}



