import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduit, NewProduit } from '../produit.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduit for edit and NewProduitFormGroupInput for create.
 */
type ProduitFormGroupInput = IProduit | PartialWithRequiredKeyOf<NewProduit>;

type ProduitFormDefaults = Pick<NewProduit, 'id' | 'categories'>;

type ProduitFormGroupContent = {
  id: FormControl<IProduit['id'] | NewProduit['id']>;
  idProduit: FormControl<IProduit['idProduit']>;
  libelle: FormControl<IProduit['libelle']>;
  description: FormControl<IProduit['description']>;
  prixUnitaire: FormControl<IProduit['prixUnitaire']>;
  taille: FormControl<IProduit['taille']>;
  couleur: FormControl<IProduit['couleur']>;
  categories: FormControl<IProduit['categories']>;
};

export type ProduitFormGroup = FormGroup<ProduitFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProduitFormService {
  createProduitFormGroup(produit: ProduitFormGroupInput = { id: null }): ProduitFormGroup {
    const produitRawValue = {
      ...this.getFormDefaults(),
      ...produit,
    };
    return new FormGroup<ProduitFormGroupContent>({
      id: new FormControl(
        { value: produitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      idProduit: new FormControl(produitRawValue.idProduit),
      libelle: new FormControl(produitRawValue.libelle),
      description: new FormControl(produitRawValue.description),
      prixUnitaire: new FormControl(produitRawValue.prixUnitaire, {
        validators: [Validators.min(0)],
      }),
      taille: new FormControl(produitRawValue.taille, {
        validators: [Validators.min(0)],
      }),
      couleur: new FormControl(produitRawValue.couleur),
      categories: new FormControl(produitRawValue.categories ?? []),
    });
  }

  getProduit(form: ProduitFormGroup): IProduit | NewProduit {
    return form.getRawValue() as IProduit | NewProduit;
  }

  resetForm(form: ProduitFormGroup, produit: ProduitFormGroupInput): void {
    const produitRawValue = { ...this.getFormDefaults(), ...produit };
    form.reset(
      {
        ...produitRawValue,
        id: { value: produitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProduitFormDefaults {
    return {
      id: null,
      categories: [],
    };
  }
}
