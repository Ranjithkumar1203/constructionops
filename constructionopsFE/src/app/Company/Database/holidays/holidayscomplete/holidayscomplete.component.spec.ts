import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayscompleteComponent } from './holidayscomplete.component';

describe('HolidayscompleteComponent', () => {
  let component: HolidayscompleteComponent;
  let fixture: ComponentFixture<HolidayscompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayscompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayscompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
