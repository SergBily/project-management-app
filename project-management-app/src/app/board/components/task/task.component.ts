import { Component, Input, OnInit } from '@angular/core';
import { StateTask } from '../../redux/state.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: StateTask;

  constructor() { }

  ngOnInit(): void {
    console.log(this.task);
  }
}
