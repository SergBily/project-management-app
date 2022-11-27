import { TestBed } from '@angular/core/testing';

import { EffectsService } from './effects.service';

describe('EffectsService', () => {
  let service: EffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
