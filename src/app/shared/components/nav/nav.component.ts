import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {PanierService} from '../../services/impl/panier.service';
import {PanierCatalogue} from '../../models/catalogue.model';
import {AuthentificationMockService} from '../../services/impl/authentification-mock.service';
import {PUBLIC_ROUTES} from '../../routes/public';


@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  // isClient : boolean = false;
  // isAdmin : boolean = false;


  protected links: Link[] = [];

  constructor(public panierService: PanierService, public authService: AuthentificationMockService,
              private router : Router) {

  }


  ngOnInit(): void {
    // this.isClient = ;
    // this.isAdmin = this.authService.hasRole('Admin');
    this.links = [
      { name: 'Catalogue', path: PUBLIC_ROUTES.CATALOGUES, class:"nav-link", ariaCurrent: 'page', isVisible:true},
      { name: 'Mes Commandes', path: '/catalogue/commandes', class:"nav-link", ariaCurrent: 'page', isVisible:this.authService.hasRole('Client')},
      { name: 'Commandes', path: '/catalogue/commandes', class:"nav-link", ariaCurrent: 'page', isVisible:this.authService.hasRole('Admin')},
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
