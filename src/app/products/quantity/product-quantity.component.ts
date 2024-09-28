import { Component, Input, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ProductQuantity } from "./product-quantity.model";
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from "@angular/common";
import { Product } from "../product.model";
import { ProductQtyService } from "./product-quantity.service";

@Component({
  selector: 'app-product-quantity',
  templateUrl: 'product-quantity.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSidenavModule],
  styleUrl: 'product-quantity.component.scss'
})
export class ProductQuantityComponent implements OnInit {
  @Input() public product!: Product;
  public productQtys: ProductQuantity[] = [];
  public productQuantity!: ProductQuantity;
  private isEdit = false;
  constructor(private productQtyService: ProductQtyService) { }

  ngOnInit() {
    this.productQtys = this.product.quantities;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      console.log('Product Quantity => ', this.productQuantity);
      this.productQtyService.addOrEditQtyToProduct(this.productQuantity, this.isEdit).subscribe((response) => {
        console.log('Product Quantity added => ', response);
        // this.productQtys.push(this.productQuantity);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  editProductQty(productQty: ProductQuantity) {
    this.isEdit = true;
    console.log('Editing product quantity => ', productQty);
    this.productQuantity = productQty;
  }

  createNewQuantity() {
    this.isEdit = false;
    const code = `${this.product.Code}Q${this.product.Quantity + 1}`;
    this.productQuantity = {
      QtyCode: code,
      DateAdded: new Date().toISOString(),
      Earned: 0,
      Remarks: '',
      RentedTimes: 0,
      ProductCode: this.product.Code,
      NextAvailable: new Date().toISOString(),
      StoreId: this.product.StoreId
    };
  }
}
