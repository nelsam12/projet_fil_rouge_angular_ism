import {Component, OnInit} from '@angular/core';
import {AuthentificationMockService} from '../../../shared/services/impl/authentification-mock.service';
import {CommandeService} from '../../../shared/services/impl/commande.service';
import {ClientWithCommandePaginateDto} from '../../../shared/models/commande.model';
import {Router} from '@angular/router';
import {PaginationComponent} from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'ism-client',
  imports: [
    PaginationComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clientWithCommandes: ClientWithCommandePaginateDto | null = null;



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
    this.commandeService.getCommandesConnectedClient(page).subscribe(
      data => {
        this.clientWithCommandes = data;
        console.log(this.clientWithCommandes);
      },
      err => {
        console.error("Error getting client withCommandes client", err);
      });
  }
}
