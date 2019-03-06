import { TestBed } from '@angular/core/testing';

import { HandbookService } from './handbook.service';

describe('HandbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandbookService = TestBed.get(HandbookService);
    expect(service).toBeTruthy();
  });
});
