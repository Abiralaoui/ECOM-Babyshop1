// produit-shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduit } from '../entities/produit/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitSharedService {
  private produitsSubject = new BehaviorSubject<IProduit[] | null>(null);

  setProduits(produits: IProduit[]): void {
    this.produitsSubject.next(produits);
  }

  getProduits(): BehaviorSubject<IProduit[] | null> {
    return this.produitsSubject;
  }
}
