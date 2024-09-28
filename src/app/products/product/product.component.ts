import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../product.model";

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: 'product.component.html'
})
export class ProductComponent {
  @Input()
  public product!: Product;

  constructor(private router: Router) { }

  public loadProductDetails(product: Product) {
    console.log('product => ', product);
    this.router.navigate(['product', 'form', product.Code, product.StoreId, product._id]);
  }
}
