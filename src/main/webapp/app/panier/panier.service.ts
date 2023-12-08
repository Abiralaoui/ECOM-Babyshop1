// panier.service.ts

import { Injectable } from '@angular/core';
import { ICategory } from 'app/entities/category/category.model';
import { IProduit } from 'app/entities/produit/produit.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private _produits: BehaviorSubject<IProduit[]> = new BehaviorSubject<IProduit[]>([]);

  get produits$() {
    return this._produits.asObservable();
  }

  private _nombreArticles: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get nombreArticles$() {
    return this._nombreArticles.asObservable();
  }

  private mettreAJourNombreArticles() {
    const nombreArticles = this._produits.value.length;
    this._nombreArticles.next(nombreArticles);
  }

  ajouterAuPanier(produit: IProduit) {
    const produitsActuels = this._produits.value;
    this._produits.next([...produitsActuels, produit]);
    this.mettreAJourNombreArticles();
    // ajoute appel holder de produit actuels
  }
  getAllProduits(): IProduit[] {
    return this._produits.value;
  }
  retirerDuPanier(produit: IProduit) {
    const produitsActuels = this._produits.value;
    const nouveauxProduits = produitsActuels.filter(p => p.id !== produit.id);
    this._produits.next(nouveauxProduits);
    this.mettreAJourNombreArticles();
    // ajoute retirer
  }

  retirerDuPanier2(produit: IProduit) {
    const produitsActuels = this._produits.value;
    const index = produitsActuels.findIndex(p => p.id === produit.id);

    if (index !== -1) {
      // If the product is found, remove only that instance
      const nouveauxProduits = [...produitsActuels.slice(0, index), ...produitsActuels.slice(index + 1)];
      this._produits.next(nouveauxProduits);
      this.mettreAJourNombreArticles();
    }
  }

  isEmpty(): Observable<boolean> {
    return this.produits$.pipe(
      map(produits => produits.length === 0)
    );
  }



}
