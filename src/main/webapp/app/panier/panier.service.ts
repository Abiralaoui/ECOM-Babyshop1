import { Injectable } from '@angular/core';
import { IProduit } from 'app/entities/produit/produit.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private _produits: BehaviorSubject<IProduit[]> = new BehaviorSubject<IProduit[]>([]);
  private _nombreArticles: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Use localStorage key for storing cart data
  private storageKey = 'panier';

  constructor() {
    // Load cart data from localStorage on service initialization
    const storedProducts = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this._produits.next(storedProducts);
    this.mettreAJourNombreArticles();
  }

  get produits$(): Observable<IProduit[]> {
    return this._produits.asObservable();
  }

  ajouterAuPanier(produit: IProduit): void {
    const produitsActuels = this._produits.value;
    this._produits.next([...produitsActuels, produit]);
    this.mettreAJourNombreArticles();
    this.updateLocalStorage();
  }

  getAllProduits(): IProduit[] {
    return this._produits.value;
  }

  retirerDuPanier(produit: IProduit): void {
    const produitsActuels = this._produits.value;
    const nouveauxProduits = produitsActuels.filter(p => p.id !== produit.id);
    this._produits.next(nouveauxProduits);
    this.mettreAJourNombreArticles();
    this.updateLocalStorage();
  }

  retirertout(): void {
    this._produits.next([]);
    this.mettreAJourNombreArticles();
    this.updateLocalStorage();
  }

  retirerDuPanier2(produit: IProduit): void {
    const produitsActuels = this._produits.value;
    const index = produitsActuels.findIndex(p => p.id === produit.id);

    if (index !== -1) {
      const nouveauxProduits = [...produitsActuels.slice(0, index), ...produitsActuels.slice(index + 1)];
      this._produits.next(nouveauxProduits);
      this.mettreAJourNombreArticles();
      this.updateLocalStorage();
    }
  }

  get nombreArticles$(): Observable<number> {
    return this._nombreArticles.asObservable();
  }

  private mettreAJourNombreArticles(): void {
    const nombreArticles = this._produits.value.length;
    this._nombreArticles.next(nombreArticles);
  }

  gettotal(): number {
    const produitsActuels = this._produits.value;
    return produitsActuels.reduce((total, produit) => total + (produit.prixUnitaire ?? 0), 0);
  }

  private updateLocalStorage(): void {
    // Store the cart data in localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this._produits.value));
  }
}
