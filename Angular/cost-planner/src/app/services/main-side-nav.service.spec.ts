import { TestBed } from '@angular/core/testing';

import { MainSideNavService } from './main-side-nav.service';

describe('MainSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainSideNavService = TestBed.get(MainSideNavService);
    expect(service).toBeTruthy();
  });
});
