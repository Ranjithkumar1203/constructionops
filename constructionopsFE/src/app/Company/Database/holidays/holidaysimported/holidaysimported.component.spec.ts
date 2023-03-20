import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysimportedComponent } from './holidaysimported.component';

describe('HolidaysimportedComponent', () => {
  let component: HolidaysimportedComponent;
  let fixture: ComponentFixture<HolidaysimportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysimportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysimportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
