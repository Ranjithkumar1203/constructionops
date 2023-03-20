import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayscreateComponent } from './holidayscreate.component';

describe('HolidayscreateComponent', () => {
  let component: HolidayscreateComponent;
  let fixture: ComponentFixture<HolidayscreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayscreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
