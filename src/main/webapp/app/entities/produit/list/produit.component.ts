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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  cachedProducts?: IProduit[];
  searchTerm: string = '';
  prixFilter: 'asc' | 'desc' | null = null;
  tailleFilter: 'asc' | 'desc' | null = null;
  currentCategory: number | null = null;
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
    this.activatedRoute.queryParamMap.pipe(
      debounceTime(300), // délai d'attente de 300 ms
      distinctUntilChanged() // n'émet pas de nouveaux éléments s'ils sont égaux au précédent
    ).subscribe(() => {
      this.search();
    });
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

        this.cachedProducts = [];
        if (this.produits !== undefined)
          for (let i = 0; i < this.produits.length; i++) {
            this.cachedProducts?.push(this.produits[i]);
          }
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  currentCategoryUpdate(categoryId: number): void {
    this.currentCategory = (categoryId===this.currentCategory) ? null : categoryId;
    this.load();
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
    let criteria = (this.currentCategory == null) ? {} :
                      {key: 'category.contains', value:this.currentCategory};
    const queryObject = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
      criteria
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


  protected readonly onclick = onclick;

  isClicked = false;

  onSearchInputChange() : void {
    this.search()
  }

  search(): void {
    // Si vous effectuez une recherche côté serveur, utilisez le service ProduitService
    // this.produitService.searchProduits(this.searchTerm).subscribe({
    //   next: (res: EntityArrayResponseType) => {
    //     this.onResponseSuccess(res);
    //   },
    // });

    // Exemple de recherche locale (à adapter en fonction de votre structure de données)
    if (this.searchTerm.trim() !== '') {
      this.produits = this.cachedProducts?.filter((produit) =>
        produit.libelle?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    // Appliquez également les filtres de prix et de taille
    if (this.prixFilter) {
      this.produits = this.produits?.sort((a, b) => {
        // Vérifiez si 'prixUnitaire' est défini et non null
        const prixA = a.prixUnitaire !== undefined && a.prixUnitaire !== null ? a.prixUnitaire : 0;
        const prixB = b.prixUnitaire !== undefined && b.prixUnitaire !== null ? b.prixUnitaire : 0;

        const order = this.prixFilter === 'asc' ? 1 : -1;
        return (prixA - prixB) * order;
      });
    }


    if (this.tailleFilter) {
      this.produits = this.produits?.sort((a, b) => {
        // Vérifiez si 'taille' est défini et non null
        const tailleA = a.taille !== undefined && a.taille !== null ? a.taille : 0;
        const tailleB = b.taille !== undefined && b.taille !== null ? b.taille : 0;

        const order = this.tailleFilter === 'asc' ? 1 : -1;
        return (tailleA - tailleB) * order;
      });
    }

  }
  applyFilter(type: 'prix' | 'taille', order: 'asc' | 'desc'): void {
    if (type === 'prix') {
      this.prixFilter = order;
    } else if (type === 'taille') {
      this.tailleFilter = order;
    }

    this.search(); // Appliquez immédiatement le filtre
  }
  test() {
    // Implement your 'buy' click logic here
    this.isClicked = true;
  }

  remove() {
    // Implement your 'remove' click logic here
    this.isClicked = false;
  }
}
