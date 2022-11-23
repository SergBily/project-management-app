import { Component, OnInit } from '@angular/core';
import { arr } from '../../../../environments/environment'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  
  cards = arr;
}
