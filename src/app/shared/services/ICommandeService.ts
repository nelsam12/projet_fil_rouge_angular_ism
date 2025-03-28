import {Observable} from 'rxjs';
import {ProduitDetail, ProduitCatalogue, CommandeCatalogue, PanierCatalogue} from '../models/catalogue.model';
import {ClientWithCommandePaginateDto, Commande} from '../models/commande.model';
import {RestResponseModel} from '../models/rest-response.model';

export interface ICommandeService {
  addCommande() : Observable<RestResponseModel<Commande>> ;
  // convertPanierToCommande(panier: PanierCatalogue) : CommandeCatalogue;
  getCommandeUserConnect(page:number,uri : string, size:number) : Observable<RestResponseModel<ClientWithCommandePaginateDto>>;
}
