import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmnettabComponent } from './assignmnettab.component';

describe('AssignmnettabComponent', () => {
  let component: AssignmnettabComponent;
  let fixture: ComponentFixture<AssignmnettabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmnettabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmnettabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
