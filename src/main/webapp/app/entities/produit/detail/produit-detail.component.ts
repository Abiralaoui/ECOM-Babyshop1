import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";
import {EntityArrayResponseType, ProduitService} from "../service/produit.service";
import {LigneCommandeService} from "../../ligne-commande/service/ligne-commande.service";
import { PanierService } from 'app/panier/panier.service';
import { AvisService } from 'app/entities/avis/service/avis.service';
import { IAvis } from 'app/entities/avis/avis.model';

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
  // ProduitDetailComponent

avisList: IAvis[] = [];

  constructor(private avisService: AvisService,private panierService: PanierService,protected LigneCommandeService: LigneCommandeService,protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
  
      // Récupérez les avis liés au produit
      if (this.produit && this.produit.id) {
        this.avisService.getAvisByProduitId(this.produit.id).subscribe(
          (res: EntityArrayResponseType) => {
            this.avisList = res.body || [];
          },
          error => {
            console.error('Error fetching avis for produit', error);
          }
        );
      }
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
