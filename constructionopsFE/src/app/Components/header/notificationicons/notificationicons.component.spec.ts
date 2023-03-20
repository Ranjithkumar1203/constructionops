import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationiconsComponent } from './notificationicons.component';

describe('NotificationiconsComponent', () => {
  let component: NotificationiconsComponent;
  let fixture: ComponentFixture<NotificationiconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationiconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
