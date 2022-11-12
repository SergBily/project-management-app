import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardDialogComponent } from './add-board-dialog.component';

describe('AddBoardDialogComponent', () => {
  let component: AddBoardDialogComponent;
  let fixture: ComponentFixture<AddBoardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
