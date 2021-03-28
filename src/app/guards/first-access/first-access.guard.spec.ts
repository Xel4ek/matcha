import { TestBed } from '@angular/core/testing';

import { FirstAccessGuard } from './first-access.guard';

describe('FirstAccessGuard', () => {
  let guard: FirstAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
