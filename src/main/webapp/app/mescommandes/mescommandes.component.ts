import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClient } from 'app/entities/client/client.model';
import { ICommande } from 'app/entities/commande/commande.model';
import { ClientCommandeService } from './client-commande.service';

@Component({
  selector: 'jhi-mescommandes',
  templateUrl: './mescommandes.component.html',
  styleUrls: ['./mescommandes.component.scss']
})
export class MescommandesComponent implements OnInit {


  commandes: ICommande[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientCommandeService: ClientCommandeService
  ) {}

  ngOnInit(): void {
      
     
       
        this.getCommandesClientt(1);
    console.log(this.commandes);
  }

  getCommandesClientt(clientId: number): void {
    this.clientCommandeService.getCommandesClient(clientId)
      .subscribe(Commandes => {
       
        this.commandes = Commandes;
      });
  }

}
