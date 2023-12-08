import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";
import {EntityArrayResponseType, ProduitService} from "../service/produit.service";
import {LigneCommandeService} from "../../ligne-commande/service/ligne-commande.service";
import { PanierService } from 'app/panier/panier.service';
import { AvisService } from 'app/entities/avis/service/avis.service';
import { IAvis } from 'app/entities/avis/avis.model';

import {Observable} from "rxjs";

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
  images: string[] | undefined;
  newReview: { note: number | null, commentaire: string | null } = { note: null, commentaire: null };
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



  })
  this.loadProduitImages();

}


  previousState(): void {
    window.history.back();
  }
  loadProduitImages(): void {
    this.produitService.getImagesForProduit(this.produit?.id).subscribe(
      (images) => {
       this.images=images;
        console.log('Images du produit:', this.images);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des images du produit:', error);
      }
    );
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
    submitReview(): void {
      if (this.produit!==undefined && this.newReview.note !== null && this.newReview.commentaire !== null) {
        // Assuming you have a method in AvisService to post a new review
        this.avisService.create({
          id: null,
          note: this.newReview.note,
          commentaire: this.newReview.commentaire,
          date: null,  // Set the date accordingly, if needed
          produit: this.produit,
          client: null,  // Set the client accordingly, if needed
        }).subscribe(() => {
         
         
          // Reset the newReview object for a new review
          this.newReview = { note: null, commentaire: null };
        });
      }
    }
    
    
}