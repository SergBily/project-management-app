import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
  animations: [
    trigger('openColumnAdd', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.1s'),
      ]),
    ]),
  ],
})
export class CreateColumnComponent implements OnInit {
  @Input() typeOfBtnCreate!: string;

  isCreateColumn = false;

  constructor() { }

  ngOnInit(): void {
  }
}
