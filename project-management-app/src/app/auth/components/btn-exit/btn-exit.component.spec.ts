import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnExitComponent } from './btn-exit.component';

describe('BtnExitComponent', () => {
  let component: BtnExitComponent;
  let fixture: ComponentFixture<BtnExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnExitComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BtnExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
