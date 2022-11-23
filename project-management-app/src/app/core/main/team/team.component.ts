import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ICard } from '../../models/interface-card';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  team: ICard[] = environment.team;

  constructor() { }

  ngOnInit(): void {}
}
