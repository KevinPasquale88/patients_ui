import { TestBed } from '@angular/core/testing';

import { SearchsubmitService } from './searchsubmit.service';

describe('SearchsubmitService', () => {
  let service: SearchsubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchsubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
