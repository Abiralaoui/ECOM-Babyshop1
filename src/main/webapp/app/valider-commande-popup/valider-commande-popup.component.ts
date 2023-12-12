import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-valider-commande-popup',
  templateUrl: './valider-commande-popup.component.html',
  styleUrls: ['./valider-commande-popup.component.scss']
})
export class ValiderCommandePopupComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal,private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeModal.close();
    },2000);
  }
  redirectToMesCommande(){
    this.router.navigate(['/mescommandes']);
  }
}
