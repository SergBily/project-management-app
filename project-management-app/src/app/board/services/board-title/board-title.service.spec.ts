import { TestBed } from '@angular/core/testing';

import { BoardTitleService } from './board-title.service';

describe('BoardTitleService', () => {
  let service: BoardTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
