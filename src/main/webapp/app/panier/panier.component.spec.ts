import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import {AccountService} from "../core/auth/account.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ProduitDetailComponent} from "../entities/produit/detail/produit-detail.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;
  let accountService: AccountService;
  let mockTranslateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'panier', component: PanierComponent }]), HttpClientTestingModule],
      declarations: [ PanierComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ produit: { id: 123 } }) },
        },
        { provide: AccountService, useValue: accountService },
        { provide: TranslateService, useValue: mockTranslateService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    mockTranslateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
