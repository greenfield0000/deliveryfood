import { TestBed } from '@angular/core/testing';

import { AuthServiceImpl } from './auth-service-impl.service';

describe('AuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServiceImpl = TestBed.get(AuthServiceImpl);
    expect(service).toBeTruthy();
  });
});
