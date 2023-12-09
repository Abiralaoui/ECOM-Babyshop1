import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayComponent } from './pay.component';
import {AccountService} from "../core/auth/account.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {MescommandesComponent} from "../mescommandes/mescommandes.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder} from "@angular/forms";

describe('PayComponent', () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;
  let accountService: AccountService;
  let mockTranslateService: TranslateService;
  let mockFormBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'pay', component: PayComponent }]), HttpClientTestingModule],
      declarations: [ PayComponent ],
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
        { provide: TranslateService, useValue: mockTranslateService},
        { provide: FormBuilder, useValue: mockFormBuilder}
      ],
    })
    .compileComponents();

    accountService = TestBed.inject(AccountService);
    mockTranslateService = TestBed.inject(TranslateService);
    mockFormBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(1).toBeTruthy();
  });
});
