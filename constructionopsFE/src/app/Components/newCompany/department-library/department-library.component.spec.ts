import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLibraryComponent } from './department-library.component';

describe('DepartmentLibraryComponent', () => {
  let component: DepartmentLibraryComponent;
  let fixture: ComponentFixture<DepartmentLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
