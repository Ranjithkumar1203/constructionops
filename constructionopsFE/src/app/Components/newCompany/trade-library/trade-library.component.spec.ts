import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLibraryComponent } from './trade-library.component';

describe('TradeLibraryComponent', () => {
  let component: TradeLibraryComponent;
  let fixture: ComponentFixture<TradeLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
