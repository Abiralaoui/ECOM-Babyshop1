import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from './panier.service';
import { IProduit } from 'app/entities/produit/produit.model';
import {AccountService} from "../core/auth/account.service";
import {faCaretDown, faCaretUp, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";
import { EntityArrayResponseType, ProduitService } from 'app/entities/produit/service/produit.service';
import { ProduitSharedService } from './produit-shared.service';

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
  produitsSameCategory: IProduit[] = [];
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  allproduits!: IProduit[]| null;

  constructor(private pservice:ProduitSharedService,private route: ActivatedRoute,private router: Router, public  accountService: AccountService,public panierService: PanierService,private cdr: ChangeDetectorRef,config: NgbCarouselConfig,private produitservice:ProduitService) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.pservice.getProduits().subscribe((produits) => {
      this.allproduits = produits;
    });
    this.panierService.produits$.subscribe((produits) => {
      this.produits = produits;
      this.updateProduitsSameCategory();
    });
   
  
  }

  // Méthode pour supprimer un produit du panier
  retirerDuPanier(produit: IProduit): void {
    this.panierService.retirerDuPanier(produit);
  }

  updateProduitsSameCategory(): void {
    console.log("lesproduit")
    console.log(this.allproduits)
  
    if (this.produits.length > 0) {
      // Assuming the first product in the cart determines the category
      const firstProduct = this.produits[0];
  
      if (firstProduct.categories && firstProduct.categories.length > 0) {
        const category = firstProduct.categories[0];
  
        // Create a Map to track the count of products for each category
        const categoryCounts = new Map<number, number>();
  
        // Filter and limit products from the same category to a maximum of 6 items
        this.produitsSameCategory = this.allproduits!.filter(product => {
          const isSameCategory = product.categories?.some(cat => cat.id === category.id);
          const currentCount = categoryCounts.get(category.id) || 0;
  
          if (isSameCategory && currentCount < 6) {
            // Increment the count for the current category
            categoryCounts.set(category.id, currentCount + 1);
            return true;
          }
  
          return false;
        });
      }
    }
  }
  

  // Méthode pour modifier la quantité d'un produit dans le panier
  navigateToView(productId: number): void {
    this.router.navigate(['/produit', productId, 'view']);
  }
  validerPanier(): void {
    if (this.accountService.isAuthenticated()) {

      const total = this.calculerTotal();
      // Redirection vers la page de paiement avec le total en tant que paramètre
      this.router.navigate(['/pay'], { queryParams: { total } });
    } else {

      // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
      this.router.navigate(['/login']);
    }
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
  calculePartialTotale(produitGroup1: ProduitGroup): number {

    return (produitGroup1.produits[0].prixUnitaire??0) * produitGroup1.quantite;

  }

  // Méthode pour calculer le total du panier
  calculerTotal(): number {
    return this.produits.reduce((total, produit) => total + (produit.prixUnitaire ?? 0), 0);
  }
  getFirstImageUrl(produit: IProduit): string {
    // Check if the product has images and the first image has a URL
    const firstImage = produit.images?.[0];
    return firstImage?.url ?? '../../../content/images/img.png';
  }
  diminuer(produit: IProduit): void {
   this.panierService.retirerDuPanier2(produit);
  }

  ajouter(produit: IProduit): void {
    this.panierService.ajouterAuPanier(produit);

}




  protected readonly faTimesCircle = faTimesCircle;
  protected readonly faCaretUp = faCaretUp;
  protected readonly faCaretDown = faCaretDown;
  protected readonly faTrash = faTrash;
}
