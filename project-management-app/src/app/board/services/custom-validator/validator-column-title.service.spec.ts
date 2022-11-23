import { TestBed } from '@angular/core/testing';

import { ValidatorColumnTitleService } from './validator-column-title.service';

describe('ValidatorColumnTitleService', () => {
  let service: ValidatorColumnTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorColumnTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
