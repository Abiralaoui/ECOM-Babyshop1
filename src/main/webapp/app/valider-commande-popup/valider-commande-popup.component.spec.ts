import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderCommandePopupComponent } from './valider-commande-popup.component';

describe('ValiderCommandePopupComponent', () => {
  let component: ValiderCommandePopupComponent;
  let fixture: ComponentFixture<ValiderCommandePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderCommandePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderCommandePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
