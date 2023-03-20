import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkimportedComponent } from './workimported.component';

describe('WorkimportedComponent', () => {
  let component: WorkimportedComponent;
  let fixture: ComponentFixture<WorkimportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkimportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkimportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
