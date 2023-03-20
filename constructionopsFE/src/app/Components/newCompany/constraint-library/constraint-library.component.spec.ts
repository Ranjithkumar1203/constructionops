import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintLibraryComponent } from './constraint-library.component';

describe('ConstraintLibraryComponent', () => {
  let component: ConstraintLibraryComponent;
  let fixture: ComponentFixture<ConstraintLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstraintLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstraintLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
