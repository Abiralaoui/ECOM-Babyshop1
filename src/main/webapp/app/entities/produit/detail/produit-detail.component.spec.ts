import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProduitDetailComponent } from './produit-detail.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CategoryComponent} from "../../category/list/category.component";
import {AccountService} from "../../../core/auth/account.service";
import {TranslateService} from "@ngx-translate/core";

describe('Produit Management Detail Component', () => {
  let comp: ProduitDetailComponent;
  let fixture: ComponentFixture<ProduitDetailComponent>;
  let accountService: AccountService;
  let mockTranslateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'produit-details', component: ProduitDetailComponent }]), HttpClientTestingModule],
      declarations: [ProduitDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ produit: { id: 123 } }) },
        },
        { provide: AccountService, useValue: accountService },
        { provide: TranslateService, useValue: mockTranslateService}
      ],
    })
      .overrideTemplate(ProduitDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProduitDetailComponent);
    comp = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    mockTranslateService = TestBed.inject(TranslateService);
  });

  describe('OnInit', () => {
    it('Should load produit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.produit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
