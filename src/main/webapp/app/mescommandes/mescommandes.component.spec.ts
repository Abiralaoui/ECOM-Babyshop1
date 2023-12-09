import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MescommandesComponent } from './mescommandes.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {AccountService} from "../core/auth/account.service";
import {TranslateService} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {ProduitComponent} from "../entities/produit/list/produit.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MescommandesComponent', () => {
  let component: MescommandesComponent;
  let fixture: ComponentFixture<MescommandesComponent>;
  let accountService: AccountService;
  let mockTranslateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'mescommandes', component: MescommandesComponent }]), HttpClientTestingModule],
      declarations: [ MescommandesComponent ],
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
    .compileComponents();

    fixture = TestBed.createComponent(MescommandesComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    mockTranslateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
