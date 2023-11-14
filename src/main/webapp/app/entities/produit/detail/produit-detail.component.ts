import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduit } from '../produit.model';
import {AccountService} from "../../../core/auth/account.service";

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
  produit: IProduit | null = null;

  constructor(protected activatedRoute: ActivatedRoute ,protected accountService: AccountService ) {

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
}
