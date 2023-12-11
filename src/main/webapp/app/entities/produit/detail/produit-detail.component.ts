import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";
import {ProduitService} from "../service/produit.service";
import {LigneCommandeService} from "../../ligne-commande/service/ligne-commande.service";
import { PanierService } from 'app/panier/panier.service';
import { AvisService } from 'app/entities/avis/service/avis.service';
import { IAvis } from 'app/entities/avis/avis.model';
import { OutOfStockPopupComponent } from 'app/out-of-stock-popup/out-of-stock-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProduitPopupComponent } from 'app/add-produit-popup/add-produit-popup.component';
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
  outOfStockMessage: string | undefined;
  
    constructor( private modalService: NgbModal, public router: Router,private produitService:ProduitService,private avisService: AvisService,private panierService: PanierService,protected ligneCommandeService: LigneCommandeService,protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

    }

  ngOnInit(): void {


    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;

      // Récupérez les avis liés au produit
      this.avisService.getAvisByProduitId(produit.id).subscribe((avis: IAvis[]) => {
        this.avisList = avis
      });

      console.log(this.produit)

  });

  this.loadProduitImages();

}


  previousState(): void {
    window.history.back();
  }

  loadProduitImages(): void {
    if (this.produit?.id !== undefined) {
      this.produitService.getImagesForProduit(this.produit.id).subscribe(
          (images) => {
            this.images=images;
          },
          (error) => {
            console.error('Une erreur s\'est produite lors du chargement des images du produit:', error);
          }
      );
    }

  }
    ajouterAuPanier(): void {
      if (this.produit) {
        this.panierService.ajouterAuPanier(this.produit);
      }
      const modalRef = this.modalService.open(AddProduitPopupComponent);
      modalRef.componentInstance.produit =this.produit;
     
      
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

gotosubscription(){
  this.router.navigate(['/login']);
}
showOutOfStockModal(): void {
  const modalRef = this.modalService.open(OutOfStockPopupComponent, {
    /* Optionally, you can configure modal options here */
  });

  // You can pass data or subscribe to events from the modal
  // Example: modalRef.componentInstance.someData = yourData;
  // Example: modalRef.result.then((result) => { /* Handle modal result */ });
}
}
