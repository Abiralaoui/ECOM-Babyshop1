import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduit } from '../produit.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, ProduitService } from '../service/produit.service';
import { ProduitDeleteDialogComponent } from '../delete/produit-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import {AccountService} from "../../../core/auth/account.service";
import {Authority} from "../../../config/authority.constants";

@Component({
  selector: 'jhi-produit',
  templateUrl: './produit.component.html',
})
export class ProduitComponent implements OnInit {
  produits?: IProduit[];
  isLoading = false;
  showButton: boolean = false;
  predicate = 'id';
  ascending = true;

  constructor(
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
    protected accountService: AccountService

  ) {

  }

  trackId = (_index: number, item: IProduit): number => this.produitService.getProduitIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  delete(produit: IProduit): void {
    const modalRef = this.modalService.open(ProduitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produit = produit;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.produits = this.refineData(dataFromBody);
  }

  protected refineData(data: IProduit[]): IProduit[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IProduit[] | null): IProduit[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.produitService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
  navigateToView(productId: number): void {
    this.router.navigate(['/produit', productId, 'view']);
  }
  selectedProduct: any;
  onProductSelected(product: any) {
    this.selectedProduct = product;

  }
  showBuyNow: boolean = false;
  buyNow(produit: any): void {
  }
  truncateDescription(description: string | null | undefined): string {
    if (!description) {
      return ''; // Ou tout autre traitement que vous souhaitez pour les valeurs nulles ou indéfinies
    }

    const words = description.split(' ');
    if (words.length > 6) {
      return words.slice(0, 6).join(' ') + '...';
    }
    return description;
  }


}
