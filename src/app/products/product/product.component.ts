import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: 'product.component.html'
})
export class ProductComponent {
  @Input()
  public product: any = null;

  constructor(private router: Router) { }

  public loadProductDetails(product: any) {
    console.log('product => ', product);
    this.router.navigate(['product', 'form', product.Code]);
  }
}
