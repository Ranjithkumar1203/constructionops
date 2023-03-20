import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeprtmentComponent } from './edit-deprtment.component';

describe('EditDeprtmentComponent', () => {
  let component: EditDeprtmentComponent;
  let fixture: ComponentFixture<EditDeprtmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeprtmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeprtmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
