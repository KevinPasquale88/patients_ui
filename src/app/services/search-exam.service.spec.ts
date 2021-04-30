import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchExamService } from './search-exam.service';

describe('SearchExamService', () => {
  let service: SearchExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SearchExamService);
  });

  it('should get users', inject([HttpTestingController, SearchExamService],
    (httpMock: HttpTestingController, apiService: SearchExamService) => {
      expect(apiService).toBeTruthy();
    }
  )
  );
});