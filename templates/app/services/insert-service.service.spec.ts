import { TestBed } from '@angular/core/testing';

import { InsertServiceService } from './insert-service.service';

describe('InsertServiceService', () => {
  let service: InsertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
