import { TestBed } from '@angular/core/testing';

import { HolidayLibraryService } from './holiday-library.service';

describe('HolidayLibraryService', () => {
  let service: HolidayLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
