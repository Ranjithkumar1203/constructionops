import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkfooterComponent } from './workfooter.component';

describe('WorkfooterComponent', () => {
  let component: WorkfooterComponent;
  let fixture: ComponentFixture<WorkfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
