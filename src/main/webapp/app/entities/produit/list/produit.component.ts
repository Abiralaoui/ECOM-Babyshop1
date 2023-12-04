// produit.component.ts

// ... (existing imports)

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IProduit } from '../produit.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, ProduitService } from '../service/produit.service';
import { ProduitDeleteDialogComponent } from '../delete/produit-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { AccountService } from "../../../core/auth/account.service";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PanierService } from "../../../panier/panier.service";
import { CategoryService } from "../../category/service/category.service";
import { ICategory } from "../../category/category.model";
import { IImage } from 'app/entities/image/image.model';

@Component({
  selector: 'jhi-produit',
  templateUrl: './produit.component.html',
})
export class ProduitComponent implements OnInit {
  imagelist: IImage[] = [];
  produits?: IProduit[];
  categories?: ICategory[];
  isLoading = false;
  showButton: boolean = false;
  predicate = 'id';
  ascending = true;
  cachedProducts?: IProduit[];
  searchTerm: string = '';
  prixFilter: 'asc' | 'desc' | null = null;
  tailleFilter: 'asc' | 'desc' | null = null;
  currentCategory: number | null = null;
  itemsPerPage = 15;
  page = 1;
  p: number = 1; // Current page for ngx-pagination
  totalItems: number = 0; // Total number of items
  itemsPerPageOptions = [15, 30, 45]; // You can customize this array based on your needs

  constructor(
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
    protected accountService: AccountService,
    protected panierService: PanierService,
    protected categoryService: CategoryService
  ) {}

  trackId = (_index: number, item: IProduit): number => this.produitService.getProduitIdentifier(item);

  ngOnInit(): void {
    this.load();
    this.fetchCategories();
    this.activatedRoute.queryParamMap.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.search();
    });
  }

  fetchCategories(): void {
    this.categoryService.query().subscribe(
      (response: EntityArrayResponseType) => {
        this.categories = response.body ?? [];
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  delete(produit: IProduit): void {
    const modalRef = this.modalService.open(ProduitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produit = produit;

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
    this.totalItems = this.produits.length; // Update totalItems after data is loaded
  }

  protected refineData(data: IProduit[]): IProduit[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IProduit[] | null): IProduit[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    let criteria = (this.selectedCategories.length == 0) ? {} :
                      {key: 'category.in', value:this.selectedCategories};

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
    // Implement buyNow logic here
  }

  truncateDescription(description: string | null | undefined): string {
    if (!description) {
      return '';
    }

    const words = description.split(' ');
    if (words.length > 6) {
      return words.slice(0, 6).join(' ') + '...';
    }
    return description;
  }

  protected readonly onclick = onclick;

  isClicked = false;

  onSearchInputChange(): void {
    this.search();
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.produits = this.cachedProducts?.filter((produit) =>
        produit.libelle?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.prixFilter) {
      this.produits = this.produits?.sort((a, b) => {
        const prixA = a.prixUnitaire !== undefined && a.prixUnitaire !== null ? a.prixUnitaire : 0;
        const prixB = b.prixUnitaire !== undefined && b.prixUnitaire !== null ? b.prixUnitaire : 0;
        const order = this.prixFilter === 'asc' ? 1 : -1;
        return (prixA - prixB) * order;
      });
    }

    if (this.tailleFilter) {
      this.produits = this.produits?.sort((a, b) => {
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

    this.search();
  }

  test() {
    this.isClicked = true;
  }

  remove() {
    this.isClicked = false;
  }

  ajouterAuPanier(produit: IProduit, event: Event) {
    if (produit) {
      this.panierService.ajouterAuPanier(produit);
    }

    console.log('Produit ajouté au panier :', produit);

    event.stopPropagation();
  }

  selectedCategories: number[] = [];

  onCategoryChange(event: any, category: ICategory): void {
    const categoryId = category.id;

    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }

    const criteria = {
      'categoryId.in': this.selectedCategories
    };

    this.produitService.fetchProductsByCriteria(criteria).subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        }
    });
  }

  currentCategoryUpdate(categoryId: number): void {
    this.selectedCategories.push(categoryId);

    const filteredProducts = this.cachedProducts?.filter((produit) => {
      return produit.categories?.some(category => this.selectedCategories.includes(category.id));
    });

    this.produits = filteredProducts?.length == 0 ? this.produits : filteredProducts;
  }

  loadPage(page: number) {
    this.page = page;
    this.load();
  }
}
