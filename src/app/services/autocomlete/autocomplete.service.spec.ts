import { TestBed } from '@angular/core/testing';

import { AutocompliteService } from './autocomplite.service';

describe('AutocompliteService', () => {
  let service: AutocompliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
