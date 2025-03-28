import {Component, inject, OnInit} from '@angular/core';
import {ProduitItemComponent} from '../components/catalogue/produit-item/produit-item.component';
import {CatalogueService} from '../../../shared/services/impl/catalogue.service';
import {ProduitCatalogue} from '../../../shared/models/catalogue.model';
import {RestResponseModel} from '../../../shared/models/rest-response.model';

@Component({
  selector: 'ism-page-catalogue',
  imports: [
    ProduitItemComponent
  ],
  templateUrl: './page-catalogue.component.html',
  styleUrl: './page-catalogue.component.css'
})
export class PageCatalogueComponent implements OnInit  {

  // constructor(private catalogueService : CatalogueService ) {
  // }
  private catalogueService:CatalogueService = inject(CatalogueService);
  response? : RestResponseModel<ProduitCatalogue[]> ;
  ngOnInit(): void {
    this.catalogueService.getAll().subscribe(
      {
        next : data => this.response = data,
        error : (err) => console.log(err)
      }
    )
    // this.products = this.catalogueService.produits;
  }



}
