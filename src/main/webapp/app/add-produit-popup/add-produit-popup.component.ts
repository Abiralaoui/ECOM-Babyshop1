import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';

@Component({
  selector: 'jhi-add-produit-popup',
  templateUrl: './add-produit-popup.component.html',
  styleUrls: ['./add-produit-popup.component.scss']
})
export class AddProduitPopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,public router :Router,private produitService :ProduitService ) { }
  @Input() produit: IProduit  | undefined;
  @Input() images  :string[] | undefined ;
  ngOnInit(): void {
    this.loadProduitImages();
    setTimeout(() => {
      this.activeModal.close();
    },3000);
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
  closeModal(): void {
    this.activeModal.close();
  }
  redirectToPanier(): void {
     this.router.navigate(['/panier']);
  }

  redirectToPay(): void {
   this.router.navigate(['/pay']);
  }
}
