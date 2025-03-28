import {Injectable} from '@angular/core';
import {ICommandeService} from '../ICommandeService';
import {CommandeCatalogue, PanierCatalogue} from '../../models/catalogue.model';
import {AuthentificationMockService} from './authentification-mock.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientWithCommandePaginateDto, Commande} from '../../models/commande.model';
import {PanierService} from './panier.service';
import {environment} from '../../../../environments/environment.development';
import {GenericService} from './generic.service';
import {RestResponseModel} from '../../models/rest-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService extends GenericService<ClientWithCommandePaginateDto> implements ICommandeService {

  constructor(private authService: AuthentificationMockService, httpClient: HttpClient, private panierService: PanierService) {
    super(httpClient);
    this.endPoint = "commandes";
    this.apiUrl = `${environment.apiUrl}/${this.endPoint}`;
  }

  addCommande(): Observable<RestResponseModel<Commande>> {
    let result: Observable<RestResponseModel<Commande>> = this.httpClient.post<RestResponseModel<Commande>>(
      `${environment.apiUrl}/commandes`,
      this.convertPanierToCommande(this.panierService.panierSignal()),);
    this.panierService.clearCart();
    return result;
  }

  private convertPanierToCommande(panier: PanierCatalogue): CommandeCatalogue {
    return {
      clientId: this.authService.currentUserSignal()?.id!,
      date: new Date(),
      details: panier.produits.map(p => {
        return {
          prix: p.sold ? p.newPrice : p.oldPrice,
          qte: p.quantiteCom!,
          produitId: p.id
        }
      }),
      montant: panier.totalPanierTTC
    };
  }

  getCommandeUserConnect(page: number = 0,uri : string , size: number = 5): Observable<RestResponseModel<ClientWithCommandePaginateDto>> {
    let url = `${environment.apiUrl}/${uri}?page=${page}&size=${size}`;
    console.log(url);
    return this.httpClient.get<RestResponseModel<ClientWithCommandePaginateDto>>(url);
  }
}
