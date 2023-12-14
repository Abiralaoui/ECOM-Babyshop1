// produit.component.ts

// ... (existing imports)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import {Options, LabelType, ChangeContext} from '@angular-slider/ngx-slider';
import { ImageService } from 'app/entities/image/service/image.service';
import { OutOfStockPopupComponent } from 'app/out-of-stock-popup/out-of-stock-popup.component';
import { AddProduitPopupComponent } from 'app/add-produit-popup/add-produit-popup.component';
import {faCircleChevronDown, faCircleChevronUp} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'jhi-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  images: IImage[] = [];
  produits?: IProduit[];
  categories?: ICategory[];
  isLoading = false;
  predicate = 'prixUnitaire';
  ascending = true;
  cachedProducts?: IProduit[];
  searchTerm = '';
  prixFilter: 'asc' | 'desc' | null = null;
  tailleFilter: 'asc' | 'desc' | null = null;
  page = 1;
  p = 1; // Current page for ngx-pagination
  totalItems = 0; // Total number of items
  criteria: any = {};
  currentPage: any = 0;
  totalPages: any;
  isClicked = false;
  minValue = 0;
  maxValue = 500;
  sortOptions = "";
  options: Options = {
    floor: 0,
    ceil: 500,
    translate(value: number, label: LabelType): string {
      switch (label) {
        case LabelType.Low:
        case LabelType.High:
        default:
          return `${value} €`;
      }
    }
  };
  selectedCategories: number[] = [];
  isCategoryCollapsed = true;
  isPrixCollapsed = true;
  isTailleCollapsed = true;

  constructor(
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
    protected accountService: AccountService,
    protected panierService: PanierService,
    protected categoryService: CategoryService,
    private imageService: ImageService,
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
    const pageable = {
      'page': this.currentPage,
      'size': 25,
      'sort': [this.sortOptions]
    };

    this.loadFromBackendWithRouteInformations(pageable, this.criteria).subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);

        this.cachedProducts = [];
        this.loadImagesForProducts();
        if (this.produits !== undefined) {

          for (let i = 0; i < this.produits.length; i++) {
            this.produits[i].outOfStock = this.produits[i].stock === 0;
            this.cachedProducts.push(this.produits[i]);

          }
        }
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  onSearchInputChange(): void {
    this.search();
  }

  search(): void {
    this.criteria['libelle.contains'] = this.searchTerm.trim();
    this.load();
  }

  applyFilter(type: 'prix' | 'taille', order: 'asc' | 'desc'): void {
    if (type === 'prix') {
      this.sortOptions = 'prixUnitaire';
    }

    if (type === 'taille') {
      this.sortOptions = 'taille';
    }

    if (order === 'asc') {
       this.sortOptions += ',asc';
    } else {
      this.sortOptions += ',desc'
    }

    this.currentPage = 0;

    this.load();
  }

  test(): void {
    this.isClicked = true;
  }

  remove(): void {
    this.isClicked = false;
  }

  ajouterAuPanier(produit: IProduit, event: Event): void {
      this.panierService.ajouterAuPanier(produit);
      const modalRef = this.modalService.open(AddProduitPopupComponent);
      modalRef.componentInstance.produit =produit;
      event.stopPropagation();
  }

  onCategoryChange(event: any, category: ICategory): void {
    const categoryId = category.id;

    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }

    this.criteria['categoryId.in'] = this.selectedCategories;
    this.currentPage = 0;

    this.load();
  }

  onPageChange(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.load();
  }

  getPages(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = [];

    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  getPagesWithEllipsis(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis') [] = [];
    const maxPages = 10;

    if (this.totalPages <= maxPages) {
      return this.getPages();
    }

    const startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(this.totalPages);
    }

    return pages;
  }


  updateSliderInfo($event: ChangeContext): void {
    this.criteria['prixUnitaire.lessThan'] = $event.highValue;
    this.criteria['prixUnitaire.greaterThan'] = $event.value;

    this.load();
  }
  loadImagesForProducts(): void {
    this.imageService.query().subscribe(
        (res) => {
          const images = res.body ?? [];
          this.associateImagesWithProducts(images);
        },
        (error) => {
          console.error('Error fetching images:', error);
        }
    );
  }

  associateImagesWithProducts(images: IImage[]): void {
    // Iterate through products and associate images
    if (this.produits) {
      this.produits.forEach((produit) => {
        produit.images = images.filter((image) => image.produit?.id === produit.id);
      });
    }
  }

  navigateToView(productId: number): void {
    this.router.navigate(['/produit', productId, 'view']);
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

  protected loadFromBackendWithRouteInformations(pageable?: any, criteria?:any): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending, pageable, criteria))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: any): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body?.content);

    this.totalPages = response.body.totalPages;
    this.produits = dataFromBody;
    this.totalItems = this.produits.length; // Update totalItems after data is loaded
  }

  protected refineData(data: IProduit[]): IProduit[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IProduit[] | null): IProduit[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean, pageable?: any, criteria?:any): Observable<EntityArrayResponseType> {
    this.isLoading = true;

    const queryObject = {
      eagerload: true,
      ...criteria,
      ...pageable
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
  showOutOfStockModal(event:any): void {
    const modalRef = this.modalService.open(OutOfStockPopupComponent, {
      /* Optionally, you can configure modal options here */
    });

    event.stopPropagation();

    // You can pass data or subscribe to events from the modal
    // Example: modalRef.componentInstance.someData = yourData;
    // Example: modalRef.result.then((result) => { /* Handle modal result */ });
  }

  protected readonly faCircleChevronDown = faCircleChevronDown;
  protected readonly faCircleChevronUp = faCircleChevronUp;
}
