import { TestBed } from '@angular/core/testing';

import { ApiAuthService } from './api.service';

describe('ApiService', () => {
  let service: ApiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
