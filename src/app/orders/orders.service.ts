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

  public getOrderState(orderId: string) {
    const url = `/api/orders/changeState/${orderId}`;
    return this.http.get(url);
  }
}
