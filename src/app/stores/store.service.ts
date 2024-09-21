import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "./store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }

  public getStores(): Observable<Store[]> {
    const url = `/api/stores`;
    return this.http.get<Store[]>(url);
  }

  public getStoreByCode(id: string): Observable<Store> {
    const url = `/api/stores/get/${id}`;
    return this.http.get<Store>(url);
  }

  public editStore(store: Store): Observable<any> {
    const id = store._id;
    const url = `/api/stores/edit/${id}`;
    return this.http.put(url, store);
  }
}
