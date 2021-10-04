import { TestBed } from '@angular/core/testing';

import { CustommerService } from './custommer.service';

describe('CustommerService', () => {
  let service: CustommerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustommerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
