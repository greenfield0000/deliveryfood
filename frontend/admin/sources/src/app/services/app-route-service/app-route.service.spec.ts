import { TestBed } from '@angular/core/testing';

import { AppRouteService } from './app-route.service';

describe('AppRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRouteService = TestBed.get(AppRouteService);
    expect(service).toBeTruthy();
  });
});
