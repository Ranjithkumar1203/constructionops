import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysfooterComponent } from './holidaysfooter.component';

describe('HolidaysfooterComponent', () => {
  let component: HolidaysfooterComponent;
  let fixture: ComponentFixture<HolidaysfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
