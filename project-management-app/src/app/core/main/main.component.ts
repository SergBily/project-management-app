import {
  animate,
  state,
  animation,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // animations: [
  //   trigger('fade', [
  //     transition('void =>*', [
  //       style({
  //         background- color: 'yellow',
  //         opacity: 1,
  //         }),
  //       animate(1000)
  //     ])
  //   ])
  // ]
})
export class MainComponent implements OnInit {
  constructor(public arrData: HeaderService) {}

  ngOnInit(): void {}
  cards = this.arrData.arr;
  a: boolean = true;

  @HostListener('document:scroll')
  scrollFunctions() {
    if (document.documentElement.scrollTop > 280) {
      this.a = false;
    } else {
      this.a = true;
    }
  }

  top() {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
