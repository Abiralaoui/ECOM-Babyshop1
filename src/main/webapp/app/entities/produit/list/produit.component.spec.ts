import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProduitService } from '../service/produit.service';

import { ProduitComponent } from './produit.component';
import {AccountService} from "../../../core/auth/account.service";
import {TranslateService} from "@ngx-translate/core";

describe('Produit Management Component', () => {
  let comp: ProduitComponent;
  let fixture: ComponentFixture<ProduitComponent>;
  let service: ProduitService;
  let accountService: AccountService;
  let mockTranslateService: TranslateService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'produit', component: ProduitComponent }]), HttpClientTestingModule],
      declarations: [ProduitComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
                'filter[someId.in]': 'dc4279ea-cfb9-11ec-9d64-0242ac120002',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
        { provide: AccountService, useValue: accountService },
        { provide: TranslateService, useValue: mockTranslateService}
      ],
    })
      .overrideTemplate(ProduitComponent, '')
      .compileComponents();

    accountService = TestBed.inject(AccountService);
    mockTranslateService = TestBed.inject(TranslateService);


    fixture = TestBed.createComponent(ProduitComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProduitService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.produits?.[0]).toEqual(undefined);
  });

  describe('trackId', () => {
    it('Should forward to produitService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getProduitIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getProduitIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
