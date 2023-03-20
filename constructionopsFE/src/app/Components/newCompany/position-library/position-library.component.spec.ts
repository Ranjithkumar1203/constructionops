import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionLibraryComponent } from './position-library.component';

describe('PositionLibraryComponent', () => {
  let component: PositionLibraryComponent;
  let fixture: ComponentFixture<PositionLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
