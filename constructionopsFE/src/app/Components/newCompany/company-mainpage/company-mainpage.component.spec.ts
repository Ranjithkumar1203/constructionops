import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMainpageComponent } from './company-mainpage.component';

describe('CompanyMainpageComponent', () => {
  let component: CompanyMainpageComponent;
  let fixture: ComponentFixture<CompanyMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
