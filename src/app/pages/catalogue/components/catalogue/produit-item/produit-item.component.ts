import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ProduitCatalogue} from '../../../../../shared/models/catalogue.model';
import {PanierService} from '../../../../../shared/services/impl/panier.service';

@Component({
  selector: 'ism-produit-item',
  imports: [

  ],
  templateUrl: './produit-item.component.html',
  styleUrl: './produit-item.component.css'
})
export class ProduitItemComponent {
  @Input({alias : "produits", required: true}) produit!: ProduitCatalogue;

  // Injection de dépendance
  constructor(private router : Router, private panierService :PanierService) {
  }

  async onLoadViewDetail(id : number) {
    this.router.navigateByUrl(".", {
      skipLocationChange: true,

    }).then(() => {
      this.router.navigate([`/catalogue/detail/${id}`])
    });

  }

  protected readonly Array = Array;

  onAddPanier(produit: ProduitCatalogue) {
    this.panierService.addProduct({
      ...produit,
      quantiteCom : 1
    })
  }
}
