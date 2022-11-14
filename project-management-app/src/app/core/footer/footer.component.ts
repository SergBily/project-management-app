import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public HeaderService: HeaderService) { }

  ngOnInit(): void {
    console.log(this.HeaderService.arr[0].name)
  }

  arrs = this.HeaderService.arr


}
