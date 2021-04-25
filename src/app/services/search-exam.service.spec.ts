import { TestBed } from '@angular/core/testing';

import { SearchExamService } from './search-exam.service';

describe('SearchExamService', () => {
  let service: SearchExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
