import { TestBed } from '@angular/core/testing';

import { BoardEffects } from './effects.service';

describe('ColumnEffectsService', () => {
  let service: BoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
