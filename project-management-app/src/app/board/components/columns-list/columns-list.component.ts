import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models';
import { columns } from 'src/app/mock';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit {
  columns: Column[] = columns;

  constructor() { }

  ngOnInit(): void {
  }
}
