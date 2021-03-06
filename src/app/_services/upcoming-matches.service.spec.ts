import { TestBed } from '@angular/core/testing';

import { UpcomingMatchesService } from './upcoming-matches.service';

describe('UpcomingMatchesService', () => {
  let service: UpcomingMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
