import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {PanierService} from '../../services/impl/panier.service';
import {PanierCatalogue} from '../../models/catalogue.model';
import {AuthentificationMockService} from '../../services/impl/authentification-mock.service';


@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  isClient : boolean = false;

  protected links: Link[] = [];

  constructor(public panierService: PanierService, public authService: AuthentificationMockService,
              private router : Router) {

  }

  ngOnInit(): void {
    this.isClient = this.authService.hasRole('Client');
    this.links = [
      { name: 'Catalogue', path: '/catalogue', class:"nav-link", ariaCurrent: 'page', isVisible:true},
      { name: 'Mes Commandes', path: '/catalogue/commandes', class:"nav-link", ariaCurrent: 'page', isVisible:this.isClient},
    ]
    // alert(this.authService.hasRole('Client'));
  }

  async onLogout() {
    this.authService.logout();
     this.router.navigateByUrl('.', {
      skipLocationChange: true,
    }).then(
       () => {
         this.router.navigate(['/catalogue']);
       }
     )
     ;
  }
}

interface Link {
  name: string;
  path: string;
  class : string; // Optionnel
  subLinks?: Array<Link>; // Optionnel
  ariaCurrent?: string; // Optionnel
  isVisible: boolean;
}
