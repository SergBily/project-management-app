import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICard } from '../models/interface-card';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  team: ICard[] = environment.team;

  constructor() { }

  ngOnInit(): void {
  }
}
