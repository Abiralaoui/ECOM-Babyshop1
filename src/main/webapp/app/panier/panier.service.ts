// panier.service.ts
import { Injectable } from '@angular/core';
import { IProduit } from 'app/entities/produit/produit.model';
import { BehaviorSubject } from 'rxjs';


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
  }

  retirerDuPanier(produit: IProduit) {
    const produitsActuels = this._produits.value;
    const nouveauxProduits = produitsActuels.filter(p => p.id !== produit.id);
    this._produits.next(nouveauxProduits);
    this.mettreAJourNombreArticles();
  }
}
