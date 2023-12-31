import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduit, NewProduit } from '../produit.model';
import { IImage } from 'app/entities/image/image.model';
import {ApiResponse} from "./ApiResponse";

export type PartialUpdateProduit = Partial<IProduit> & Pick<IProduit, 'id'>;

export type EntityResponseType = HttpResponse<IProduit>;
export type EntityArrayResponseType = HttpResponse<IProduit[]>;
export type EntityArrayPaginationResponsseType = HttpResponse<ApiResponse>;

@Injectable({ providedIn: 'root' })
export class ProduitService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produits');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(produit: NewProduit, images: any): Observable<EntityResponseType> {
    const header = new HttpHeaders();
    // Ensure you set the appropriate content type for multipart form data
    header.set('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();

    formData.append('produitDTOJSON', JSON.stringify(produit));

    for (const image of images) {
      formData.append('imagesStream', image);
    }

    return this.http.post<IProduit>(this.resourceUrl, formData, { observe: 'response', headers: header });
  }

  update(produit: IProduit): Observable<EntityResponseType> {
    return this.http.put<IProduit>(`${this.resourceUrl}/${this.getProduitIdentifier(produit)}`, produit, { observe: 'response' });
  }

  partialUpdate(produit: PartialUpdateProduit): Observable<EntityResponseType> {
    return this.http.patch<IProduit>(`${this.resourceUrl}/${this.getProduitIdentifier(produit)}`, produit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProduitIdentifier(produit: Pick<IProduit, 'id'>): number {
    return produit.id;
  }

  compareProduit(o1: Pick<IProduit, 'id'> | null, o2: Pick<IProduit, 'id'> | null): boolean {
    return o1 && o2 ? this.getProduitIdentifier(o1) === this.getProduitIdentifier(o2) : o1 === o2;
  }

  addProduitToCollectionIfMissing<Type extends Pick<IProduit, 'id'>>(
    produitCollection: Type[],
    ...produitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const produits: Type[] = produitsToCheck.filter(isPresent);
    if (produits.length > 0) {
      const produitCollectionIdentifiers = produitCollection.map(produitItem => this.getProduitIdentifier(produitItem)!);
      const produitsToAdd = produits.filter(produitItem => {
        const produitIdentifier = this.getProduitIdentifier(produitItem);
        if (produitCollectionIdentifiers.includes(produitIdentifier)) {
          return false;
        }
        produitCollectionIdentifiers.push(produitIdentifier);
        return true;
      });
      return [...produitsToAdd, ...produitCollection];
    }
    return produitCollection;
  }

    getImagesForProduit(produitId: number | undefined): Observable<string[]> {
    const endpoint = `http://localhost:9000/api/produits/${produitId}/images`;
    return this.http.get<string[]>(endpoint);
  }
  getImages(): Observable<IImage[]> {
    const endpoint = `http://localhost:9000/api/images`;
    return this.http.get<IImage[]>(endpoint);
  }

  fetchProductsByCriteria(criteria: Record<string, any>): Observable<EntityArrayResponseType> {
    const options = createRequestOption(criteria);
    const url = `${this.resourceUrl}`;

    return this.http.get<IProduit[]>(url, { params: options, observe: 'response' });
  }
}
