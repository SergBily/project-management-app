import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  showButtonTop: boolean = true;

  @HostListener('document:scroll')
  scrollFunctions() {
    if (document.documentElement.scrollTop > 280) {
      this.showButtonTop = false;
    } else {
      this.showButtonTop = true;
    }
  }

  top() {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
