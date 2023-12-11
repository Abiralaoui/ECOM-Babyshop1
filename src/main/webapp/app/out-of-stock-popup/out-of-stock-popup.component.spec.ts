import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfStockPopupComponent } from './out-of-stock-popup.component';

describe('OutOfStockPopupComponent', () => {
  let component: OutOfStockPopupComponent;
  let fixture: ComponentFixture<OutOfStockPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutOfStockPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfStockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
