import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from './panier.service';
import { IProduit } from 'app/entities/produit/produit.model';
interface ProduitGroup {
  produits: IProduit[];
  quantite: number;
}
@Component({
  selector: 'jhi-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  produits: IProduit[] = [];
  constructor(private router: Router,public panierService: PanierService) { }

  ngOnInit(): void {
    this.panierService.produits$.subscribe((produits) => {
      this.produits = produits;
    });
  }
  navigateToPanier() {
    this.router.navigate(['/panier']);
  }
  panierItems: any[] = [
    { nom: 'Produit 1', prix: 19.99, quantite: 1 },
    { nom: 'Produit 2', prix: 29.99, quantite: 2 },
    // ... autres articles
  ];

  // Méthode pour supprimer un produit du panier
  retirerDuPanier(produit: IProduit) {
    this.panierService.retirerDuPanier(produit);
  }

  // Méthode pour modifier la quantité d'un produit dans le panier
  
  validerPanier() {
    // Mettez ici la logique pour valider le panier, par exemple, rediriger vers une page de paiement.
    console.log("Panier validé !", this.produits);
    this.router.navigate(['/pay']);
  }
  get produitsGroupes(): ProduitGroup[] {
    const produitsGroupes: ProduitGroup[] = [];
    this.produits.forEach((produit) => {
      const groupeExist = produitsGroupes.find((g) => g.produits[0].id === produit.id);

      if (groupeExist) {
        groupeExist.quantite += 1;
      } else {
        produitsGroupes.push({ produits: [produit], quantite: 1 });
      }
    });

    return produitsGroupes;
  }

  // Méthode pour calculer le total du panier
  calculerTotal(): number {
    return this.produits.reduce((total, produit) => total + (produit.prixUnitaire || 0), 0);
  }
}
