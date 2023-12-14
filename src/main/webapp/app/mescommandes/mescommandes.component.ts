import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommande } from 'app/entities/commande/commande.model';
import { ClientCommandeService } from './client-commande.service';
import {AccountService} from "../core/auth/account.service";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { IProduit } from 'app/entities/produit/produit.model';
import {ILigneCommande} from "../entities/ligne-commande/ligne-commande.model";

@Component({
  selector: 'jhi-mescommandes',
  templateUrl: './mescommandes.component.html',
  styleUrls: ['./mescommandes.component.scss']
})
export class MescommandesComponent implements OnInit {

  commandes: ICommande[] = [];


  constructor(
    private route: ActivatedRoute,
    private clientCommandeService: ClientCommandeService,
    private accountService : AccountService
  ) {}

  ngOnInit(): void {
    /*this.accountService.identity().subscribe(account => {
    })*/

    this.accountService.identity(true).subscribe(user =>
      // @ts-ignore
      this.getCommandesClientt(user.id)
    );

  }
  formatDate(date: dayjs.Dayjs): string {
    return dayjs(date).locale('fr').format('DD/MMM/YYYY');
  }
  getCommandesClientt(clientId: number): void {
    this.clientCommandeService.getCommandesClient(clientId)
      .subscribe(Commandes => {
        this.commandes = Commandes;
      });
  }
  calculateTotalPrice(commande: ICommande): number {
    const ligneCommandes = commande.ligneCommandes || [];
    return ligneCommandes.reduce((total, ligne) => total + (ligne.prix || 0), 0);
  }


}
