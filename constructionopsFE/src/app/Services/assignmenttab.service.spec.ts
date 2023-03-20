import { TestBed } from '@angular/core/testing';

import { AssignmenttabService } from './assignmenttab.service';

describe('AssignmenttabService', () => {
  let service: AssignmenttabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmenttabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
