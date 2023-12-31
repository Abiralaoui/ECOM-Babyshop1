import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ImageFormService, ImageFormGroup } from './image-form.service';
import { IImage } from '../image.model';
import { ImageService } from '../service/image.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html',
})
export class ImageUpdateComponent implements OnInit {
  isSaving = false;
  image: IImage | null = null;

  produitsSharedCollection: IProduit[] = [];

  editForm: ImageFormGroup = this.imageFormService.createImageFormGroup();

  constructor(
    protected imageService: ImageService,
    protected imageFormService: ImageFormService,
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduit = (o1: IProduit | null, o2: IProduit | null): boolean => this.produitService.compareProduit(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
      if (image) {
        this.updateForm(image);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const image = this.imageFormService.getImage(this.editForm);
    if (image.id !== null) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>): void {
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

  protected updateForm(image: IImage): void {
    this.image = image;
    this.imageFormService.resetForm(this.editForm, image);

    this.produitsSharedCollection = this.produitService.addProduitToCollectionIfMissing<IProduit>(
      this.produitsSharedCollection,
      image.produit
    );
  }

  protected loadRelationshipsOptions(): void {
    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduit[]>) => res.body ?? []))
      .pipe(map((produits: IProduit[]) => this.produitService.addProduitToCollectionIfMissing<IProduit>(produits, this.image?.produit)))
      .subscribe((produits: IProduit[]) => (this.produitsSharedCollection = produits));
  }
}
