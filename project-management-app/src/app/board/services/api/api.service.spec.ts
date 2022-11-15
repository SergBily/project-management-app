import { TestBed } from '@angular/core/testing';

import { ApiBoardService } from './api.service';

describe('ApiService', () => {
  let service: ApiBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
