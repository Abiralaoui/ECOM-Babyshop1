import dayjs from 'dayjs/esm';
import { ICarteBancaire } from 'app/entities/carte-bancaire/carte-bancaire.model';
import { IClient } from 'app/entities/client/client.model';
import { EtatCommande } from 'app/entities/enumerations/etat-commande.model';
import { TypePayement } from 'app/entities/enumerations/type-payement.model';
import { ILigneCommande } from '../ligne-commande/ligne-commande.model';

export interface ICommande {
  id: number;
  date?: dayjs.Dayjs | null;
  etat?: EtatCommande | null;
  typePayement?: TypePayement | null;
  carteBancaire?: ICarteBancaire| null;
  client?: Pick<IClient, 'id'> | null;
  ligneCommandes?:ILigneCommande[]| null;
}

export type NewCommande = Omit<ICommande, 'id'> & { id: null };
