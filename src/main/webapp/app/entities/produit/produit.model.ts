import { ICategory } from 'app/entities/category/category.model';
import {IImage} from "../image/image.model";

export interface IProduit {
  id: number;
  idProduit?: number | null;
  libelle?: string | null;
  description?: string | null;
  prixUnitaire?: number | null;
  taille?: number | null;
  couleur?: string | null;
  stock?:number | null;
  categories?: Pick<ICategory, 'id'>[] | null;
  images?: IImage[] | null;
  outOfStock?: boolean | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
