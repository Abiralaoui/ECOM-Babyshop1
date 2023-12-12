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
  `],
  styleUrls: ['./produit-detail.componenet.scss']

})
export class ProduitDetailComponent implements OnInit {

  @Input() produit: IProduit | undefined;
  // ProduitDetailComponent

  avisList: IAvis[] = [];
  images: string[] | undefined;
  mainImage: string | undefined;
  avisGlobal: number | undefined;
  constructor( private produitService:ProduitService,private avisService: AvisService,private panierService: PanierService,protected LigneCommandeService: LigneCommandeService,protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

  }

  ngOnInit(): void {


    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;

      // Récupérez les avis liés au produit
      this.avisService.getAvisByProduitId(produit.id).subscribe((avis: IAvis[]) => {
        this.avisList = avis
        console.log(this.avisList); // Display filtered reviews in the console
      });
      this.avisGlobal = this.getAvisGlobal();


    })
    this.loadProduitImages();

  }


  previousState(): void {
    window.history.back();
  }
  loadProduitImages(): void {
    this.produitService.getImagesForProduit(this.produit?.id).subscribe(
      (images) => {
        if(images && images.length > 0)
        {
          this.mainImage = images[0];
        }
        this.images=images;
        console.log('Images du produit:', this.images);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des images du produit:', error);
      }
    );
  }
  getAvisGlobal(): number | undefined {
    if (this.avisList && this.avisList.length > 0) {
      let total = 0;
      for (const avis of this.avisList) {
        total += avis.note ?? 0;
      }

      return total / this.avisList.length;
    }
    return undefined;
  }
  changeMainImage(newSource: string): void {
    this.mainImage = newSource;
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
