import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommande } from 'app/entities/commande/commande.model';
import { ClientCommandeService } from './client-commande.service';
import {AccountService} from "../core/auth/account.service";

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
    this.getCommandesClientt(3);
  }

  getCommandesClientt(clientId: number): void {
    this.clientCommandeService.getCommandesClient(clientId)
      .subscribe(Commandes => {

        this.commandes = Commandes;
      });
  }

}
