import { TestBed } from '@angular/core/testing';

import { AppAccountContextService } from './app-account-context.service';

describe('AppAccountContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppAccountContextService = TestBed.get(AppAccountContextService);
    expect(service).toBeTruthy();
  });
});
