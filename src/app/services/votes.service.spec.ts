import { TestBed } from '@angular/core/testing';

import { VotesService } from './votes.service';

describe('EnrollmentsService', () => {
  let service: VotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
