import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompdashboardComponent } from './compdashboard.component';

describe('CompdashboardComponent', () => {
  let component: CompdashboardComponent;
  let fixture: ComponentFixture<CompdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
