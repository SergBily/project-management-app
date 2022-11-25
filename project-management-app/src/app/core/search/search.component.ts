import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  titleArrow = true
  descriptionArrow = true
  active = true

  titleAction = false
  descriptionAction = false

  eventEmitter = ''

  url = ''

  response = {}

  constructor(public http: HttpClient, public ServiceService: ServiceService) { }
  // text = 'this.variable'
  variable = 'fdfdfdf'
  variable2 = this.ServiceService.shareUserText
  // text = this.variable

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.variable2 = this.ServiceService.shareUserText
  }

  changeAction(){
    this.titleAction = false
    this.descriptionAction = false
  }
  sortTitle(){
    this.changeAction()
    this.titleArrow = !this.titleArrow
    this.titleAction = true    
  }

  sortDescription(){
    this.changeAction()
    this.descriptionArrow = !this.titleArrow
    this.descriptionAction = true 
  }

  request(){
    this.variable2 = this.ServiceService.shareUserText
    console.log(this.ServiceService.shareUserText)
  //   this.http.delete(this.url)
  //   .subscribe((response)=>{
  //     this.response = response
  //     console.log(this.response)
  //   })
  }

}
