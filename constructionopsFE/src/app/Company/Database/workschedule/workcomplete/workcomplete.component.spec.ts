import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcompleteComponent } from './workcomplete.component';

describe('WorkcompleteComponent', () => {
  let component: WorkcompleteComponent;
  let fixture: ComponentFixture<WorkcompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkcompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
