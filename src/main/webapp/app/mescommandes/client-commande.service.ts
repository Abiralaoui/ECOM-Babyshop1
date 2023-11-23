// client-commande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommande } from 'app/entities/commande/commande.model';

@Injectable({
  providedIn: 'root'
})
export class ClientCommandeService {
  private apiUrl = '/api'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getCommandesClient(clientId: number): Observable<ICommande[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}/commandes`);
  }
}
