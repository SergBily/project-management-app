import { TestBed } from '@angular/core/testing';

import { DateUserService } from './date-user';

describe('UserDateService', () => {
  let service: DateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
