import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysaddComponent } from './holidaysadd.component';

describe('HolidaysaddComponent', () => {
  let component: HolidaysaddComponent;
  let fixture: ComponentFixture<HolidaysaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
