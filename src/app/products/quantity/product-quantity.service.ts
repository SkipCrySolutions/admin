import { Injectable } from "@angular/core";
import { ProductQuantity } from "./product-quantity.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductQtyService {
  constructor(private http: HttpClient) { }
public addOrEditQtyToProduct(productQty: ProductQuantity, isEdit?: boolean) {
    console.log('Adding quantity to product => ', productQty);
    const url = isEdit ? `/api/productQty/edit/${productQty._id}`: `/api/productQty/add/${productQty.ProductCode}`;
    return isEdit ? this.http.put(url, productQty) : this.http.post(url, productQty);

}
}
