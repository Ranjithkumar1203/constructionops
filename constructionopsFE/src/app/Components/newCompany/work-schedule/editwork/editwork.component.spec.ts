import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworkComponent } from './editwork.component';

describe('EditworkComponent', () => {
  let component: EditworkComponent;
  let fixture: ComponentFixture<EditworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
