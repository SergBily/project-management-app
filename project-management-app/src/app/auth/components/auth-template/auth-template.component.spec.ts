import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTemplateComponent } from './auth-template.component';

describe('AuthTemplateComponent', () => {
  let component: AuthTemplateComponent;
  let fixture: ComponentFixture<AuthTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
