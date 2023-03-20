import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkScheduleComponent } from './edit-work-schedule.component';

describe('EditWorkScheduleComponent', () => {
  let component: EditWorkScheduleComponent;
  let fixture: ComponentFixture<EditWorkScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
