import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProduitFormService, ProduitFormGroup } from './produit-form.service';
import { IProduit } from '../produit.model';
import { ProduitService } from '../service/produit.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import {ImageService} from "../../image/service/image.service";
import {IImage} from "../../image/image.model";

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html',
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;
  produit: IProduit | null = null;

  categoriesSharedCollection: ICategory[] = [];
  imagesSharedCollection: IImage[] = [];

  editForm: ProduitFormGroup = this.produitFormService.createProduitFormGroup();

  constructor(
    protected produitService: ProduitService,
    protected produitFormService: ProduitFormService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    protected imageService: ImageService
  ) {}

  compareCategory = (o1: ICategory | null, o2: ICategory | null): boolean => this.categoryService.compareCategory(o1, o2);

  compareImage = (o1: ICategory | null, o2: ICategory | null): boolean => this.imageService.compareImage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
      if (produit) {
        this.updateForm(produit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.produitFormService.getProduit(this.editForm);
    if (produit.id !== null) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produit: IProduit): void {
    this.produit = produit;
    this.produitFormService.resetForm(this.editForm, produit);

    this.categoriesSharedCollection = this.categoryService.addCategoryToCollectionIfMissing<ICategory>(
      this.categoriesSharedCollection,
      ...(produit.categories ?? [])
    );

    this.imagesSharedCollection = this.imageService.addImageToCollectionIfMissing<IImage>(
      this.imagesSharedCollection,
      ...(produit.images ?? [])
    )
  }

  protected loadRelationshipsOptions(): void {
    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<ICategory[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategory[]) =>
          this.categoryService.addCategoryToCollectionIfMissing<ICategory>(categories, ...(this.produit?.categories ?? []))
        )
      )
      .subscribe((categories: ICategory[]) => (this.categoriesSharedCollection = categories));

    this.imageService
      .query()
      .pipe(map((res: HttpResponse<IImage[]>) => res.body ?? []))
      .pipe(
        map((images: IImage[]) =>
          this.imageService.addImageToCollectionIfMissing<IImage>(images, ...(this.produit?.images ?? []))
        )
      )
      .subscribe((images: IImage[]) => (this.imagesSharedCollection = images));
  }
}
