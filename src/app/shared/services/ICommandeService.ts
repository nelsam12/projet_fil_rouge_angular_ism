import {Observable} from 'rxjs';
import {ProduitDetail, ProduitCatalogue, CommandeCatalogue, PanierCatalogue} from '../models/catalogue.model';
import {ClientWithCommandePaginateDto, Commande} from '../models/commande.model';

export interface ICommandeService {
  addCommande() : Observable<Commande>;
  convertPanierToCommande(panier: PanierCatalogue) : CommandeCatalogue;
  getCommandesConnectedClient(page:number, size:number) : Observable<ClientWithCommandePaginateDto>;
}
