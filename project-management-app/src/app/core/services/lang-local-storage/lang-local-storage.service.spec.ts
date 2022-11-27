import { TestBed } from '@angular/core/testing';

import { LangLocalStorageService } from './lang-local-storage.service';

describe('LangLocalStorageService', () => {
  let service: LangLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
