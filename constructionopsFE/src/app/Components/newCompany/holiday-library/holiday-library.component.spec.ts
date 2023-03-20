import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayLibraryComponent } from './holiday-library.component';

describe('HolidayLibraryComponent', () => {
  let component: HolidayLibraryComponent;
  let fixture: ComponentFixture<HolidayLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
