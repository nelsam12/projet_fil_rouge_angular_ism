import {Observable} from 'rxjs';
import {ProduitDetail, ProduitCatalogue} from '../models/catalogue.model';
import {RestResponseModel} from '../models/rest-response.model';

export interface ICatalogueService {
  getProductDetailCatalogue(produitId : number):Observable<RestResponseModel<ProduitDetail>>;
}
