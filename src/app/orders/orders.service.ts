import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public selectedTab = 'placed';
  constructor(private http: HttpClient) {
  }

  public getOrders(): Observable<any> {
    const url = `/api/orders/get/${this.selectedTab}`;
    return this.http.get(url);
  }

  public getOrderState(order: any): Observable<any> {
    const url = `/api/orders/changeState/${order.storeId}/${order.customerId}/${order.orderId}/false`;
    return this.http.get(url);
  }
}
