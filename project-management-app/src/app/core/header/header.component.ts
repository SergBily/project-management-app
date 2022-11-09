import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  event = event?.target as HTMLElement
  // srtrg:number = 1
  registrationYes = false
  registrationNo = true

  enter(){
    if(true){
      this.registrationYes = true
      this.registrationNo = false
    }
  }

  exit(){
    this.registrationYes = false
    this.registrationNo = true
  }
  
  enSwitchLanguage(){
    
    console.log('44ee')
    // console.log(event.target)
    // console.log(event.target)
    // console.log(this.event)
    // if(event.target.id === 'en'){
    //   event.target.classList.add('black')
    //   console.log('ee')
    // }
  }
}
