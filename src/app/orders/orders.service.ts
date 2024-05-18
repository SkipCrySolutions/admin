import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
    this.getAllOrders();
  }

  public getAllOrders(): Observable<any> {
    const url = `/api/orders`;
    return this.http.get(url);
  }

  public getOrderState(orderId: string) {
    const url = `/api/orders/changeState/${orderId}`;
    return this.http.get(url);
  }
}
