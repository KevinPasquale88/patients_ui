import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchsubmitService } from './searchsubmit.service';

describe('SearchsubmitService', () => {
  let service: SearchsubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SearchsubmitService);
  });

  it('should get users', inject([HttpTestingController, SearchsubmitService],
    (httpMock: HttpTestingController, apiService: SearchsubmitService) => {
      expect(apiService).toBeTruthy();
    }
  )
  );
});