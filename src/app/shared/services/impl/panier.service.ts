import {Injectable, signal} from '@angular/core';
import {IPanierCatalogue} from '../IPanierCatalogue';
import {PanierCatalogue, ProduitCatalogue} from '../../models/catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService implements IPanierCatalogue {

  panierSignal = signal<PanierCatalogue>(this.initialize())

  constructor() { }

  addProduct(produit: ProduitCatalogue): void {
    let prix: number = produit.sold ? produit.newPrice : produit.oldPrice
    let montant : number = produit.quantiteCom! * prix;
    this.panierSignal.update(panier=> ({
      ...panier,
      produits : this.updateProductList(panier.produits, produit),
      totalPanierTTC : (panier.totalPanierHT + montant)* (1+panier.tva),
      totalPanierHT : panier.totalPanierHT + montant
      }))
  }

  clearCart(): void {
    this.panierSignal.set(this.initialize())
  }

  private updateProductList(productsList: ProduitCatalogue[], newProduct:ProduitCatalogue): ProduitCatalogue[] {
    let index:number = productsList.findIndex(product => newProduct.id == product.id);
    if (index >= 0) {
      productsList[index].quantiteCom! += newProduct.quantiteCom!;
    }else{
      productsList.push(newProduct)
    }
    return [...productsList];
  }

  deleteProduct(produit: ProduitCatalogue): void {
  }

  private initialize(): PanierCatalogue {
    return {
      produits : [],
      totalPanierHT : 0,
      totalPanierTTC : 0,
      date : new Date(),
      tva : 0.18
    }
  }
}
