import { TestBed } from '@angular/core/testing';

import { OngoingMatchesService } from './ongoing-matches.service';

describe('OngoingMatchesService', () => {
  let service: OngoingMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngoingMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
