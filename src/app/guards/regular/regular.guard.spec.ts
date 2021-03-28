import { TestBed } from '@angular/core/testing';

import { RegularGuard } from './regular.guard';

describe('RegularGuard', () => {
  let guard: RegularGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegularGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
