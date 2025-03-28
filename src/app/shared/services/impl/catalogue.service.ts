import { Injectable } from '@angular/core';
import {ProduitCatalogue, ProduitDetail} from '../../models/catalogue.model';
import {ICatalogueService} from '../ICatalogueService';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {GenericService} from './generic.service';
import {RestResponseModel} from '../../models/rest-response.model';

// Singleton + Injection de dépendance
@Injectable({
  providedIn: 'root' //
})
export class CatalogueService extends GenericService<ProduitCatalogue> implements ICatalogueService {
  constructor(httpClient: HttpClient) {
    super(httpClient)
    this.endPoint = "produits"
    this.apiUrl = `${environment.apiUrl}/${this.endPoint}`;
  }
  getProductDetailCatalogue(produitId : number): Observable<RestResponseModel<ProduitDetail>> {
    return this.httpClient.get<RestResponseModel<ProduitDetail>>(`${environment.apiUrl}/produits/detail/${produitId}`);
  }
}
