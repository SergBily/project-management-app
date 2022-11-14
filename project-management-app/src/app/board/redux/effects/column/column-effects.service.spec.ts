import { TestBed } from '@angular/core/testing';

import { ColumnEffects } from './column-effects.service';

describe('ColumnEffectsService', () => {
  let service: ColumnEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
