import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";
import {ProduitService} from "../service/produit.service";
import {LigneCommandeService} from "../../ligne-commande/service/ligne-commande.service";
import { PanierService } from 'app/panier/panier.service';

@Component({
  selector: 'jhi-produit-detail',
  templateUrl: './produit-detail.component.html',
  styles: [`
    .custom-button {
      /* Ajoutez votre style personnalisé ici */
      background-color: #337ab7;
      color: #fff;
      /* Ajoutez d'autres styles selon vos besoins */
    }

    .custom-button:hover {
      /* Styles pour l'état survolé */
      background-color: #286090;
    }
  `]
})
export class ProduitDetailComponent implements OnInit {

  @Input() produit: IProduit | undefined;
  constructor(private panierService: PanierService,protected LigneCommandeService: LigneCommandeService,protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
    });
  }

  previousState(): void {
    window.history.back();
  }


  onQuantityChange(quantity: number) {
    console.log('Nouvelle quantité sélectionnée :', quantity);
    // Faites ce que vous voulez avec la nouvelle quantité...
  }
  
    ajouterAuPanier() {
      if (this.produit) {
        this.panierService.ajouterAuPanier(this.produit);
      }
      console.log('Produit ajouté au panier :', this.produit);
    }

    // Ajoutez ici la logique pour ajouter le produit au panier
    // Vous pouvez utiliser un service pour gérer le panier ou effectuer d'autres actions nécessaires
    // Par exemple, si vous utilisez un service de panier, vous pourriez appeler une méthode comme :
    // this.panierService.ajouterAuPanier(this.produit);
   
  
}
