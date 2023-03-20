import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateworkComponent } from './creatework.component';

describe('CreateworkComponent', () => {
  let component: CreateworkComponent;
  let fixture: ComponentFixture<CreateworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
