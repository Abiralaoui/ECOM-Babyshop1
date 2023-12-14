import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";
import {EntityArrayResponseType, ProduitService} from "../service/produit.service";
import {LigneCommandeService} from "../../ligne-commande/service/ligne-commande.service";
import { PanierService } from 'app/panier/panier.service';
import { AvisService } from 'app/entities/avis/service/avis.service';
import { IAvis } from 'app/entities/avis/avis.model';
import dayjs from 'dayjs/esm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProduitPopupComponent } from 'app/add-produit-popup/add-produit-popup.component';
import { OutOfStockPopupComponent } from 'app/out-of-stock-popup/out-of-stock-popup.component';
import { HttpResponse } from '@angular/common/http';


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
  newReview: { note: number | null, commentaire: string | null } = { note: null, commentaire: null };
  selected = 0;
  outOfStockMessage: string | undefined;
  constructor(private router:Router, private modalService: NgbModal, private produitService:ProduitService,private avisService: AvisService,private panierService: PanierService,protected LigneCommandeService: LigneCommandeService,protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

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

      return (total / this.avisList.length);
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
    const modalRef = this.modalService.open(AddProduitPopupComponent);
    modalRef.componentInstance.produit =this.produit;
    console.log('Produit ajouté au panier :', this.produit);
  }


  onRatingChange(newRating: number): void {
    this.newReview.note = newRating;
    console.log('Nouvelle note sélectionnée :', newRating);
    // Do whatever you want with the updated rating in the parent component
  }
  submitReview(): void {
    if (this.produit !== undefined && this.newReview.note !== null && this.newReview.commentaire !== null) {
      // Assuming you have a method in AvisService to post a new review
      console.log('Nouvel avis :', this.newReview);
      this.avisService.create({
        id: null,
        note: this.newReview.note,
        commentaire: this.newReview.commentaire,
        date: dayjs(),  // Set the date accordingly, if needed
        produit: this.produit,
        client: null,  // Set the client accordingly, if needed
      }).subscribe((response: HttpResponse<IAvis>) => {
        const newlyAddedReview: IAvis| null = response.body ; // Ensure there is an 'id' property
  
        // Update the local state with the newly added review
        this.avisList = [newlyAddedReview!, ...this.avisList];
  
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

  protected readonly Date = Date;
}
