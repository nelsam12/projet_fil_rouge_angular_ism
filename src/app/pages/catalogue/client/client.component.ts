import {Component, OnInit} from '@angular/core';
import {AuthentificationMockService} from '../../../shared/services/impl/authentification-mock.service';
import {CommandeService} from '../../../shared/services/impl/commande.service';
import {ClientWithCommandePaginateDto} from '../../../shared/models/commande.model';
import {Router} from '@angular/router';
import {PaginationComponent} from '../../../shared/components/pagination/pagination.component';
import {RestResponseModel} from '../../../shared/models/rest-response.model';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ism-client',
  imports: [
    PaginationComponent, DatePipe
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  response!: RestResponseModel<ClientWithCommandePaginateDto | null>;

  constructor(public authService: AuthentificationMockService,
              private commandeService: CommandeService,
              private router: Router,) {

  }

  ngOnInit(): void {
    // if (this.clientWithCommandes != null) {
    if (this.authService.isAuthenticated()) {
      this.refresh()
    } else {
      // ToDo : Redirection au rafraichissement de la page
      this.router.navigateByUrl('/security/login');
    }
  }


  onPaginate(page: number) {
    this.refresh(page)
  }

  private refresh(page: number = 0) {
   let uri: string = this.authService.isClient() ? `commandes/client/${this.authService.currentUserSignal()?.id!}` : "commandes";
    this.commandeService.getCommandeUserConnect(page, uri).subscribe(
      {
        next: data => this.response = data,
        error: (err) => console.error("Error getting client withCommandes client", err),
      });
  }
}
