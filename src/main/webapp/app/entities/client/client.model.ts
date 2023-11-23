import { ICarteBancaire } from 'app/entities/carte-bancaire/carte-bancaire.model';
import { ICommande } from '../commande/commande.model';

export interface IClient {
  id: number;
  identifiant?: string | null;
  motDePasse?: string | null;
  tel?: string | null;
  address?: string | null;
  carteBancaires?: Pick<ICarteBancaire, 'id'>[] | null;
  commandes?: ICommande[];
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
