import { TestBed } from '@angular/core/testing';

import { MyMatchesService } from './my-matches.service';

describe('MyMatchesService', () => {
  let service: MyMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
