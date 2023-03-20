import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyforgetpasskeyComponent } from './verifyforgetpasskey.component';

describe('VerifyforgetpasskeyComponent', () => {
  let component: VerifyforgetpasskeyComponent;
  let fixture: ComponentFixture<VerifyforgetpasskeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyforgetpasskeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyforgetpasskeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
