import { ICommande } from 'app/entities/commande/commande.model';
import { IProduit } from 'app/entities/produit/produit.model';

export interface ILigneCommande {
  id: number| null;
  quantite?: number | null;
  prix?: number | null;
  produit?:IProduit| null;
  showDetails? :boolean| null;
}

export type NewLigneCommande = Omit<ILigneCommande, 'id'> & { id: null };
