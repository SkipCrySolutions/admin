import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "./store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }

  public getStores(): Observable<Store[]> {
    return this.http.get<Store[]>('/api/stores');
  }

  public getStoreByCode(id: string): Observable<Store> {
    return this.http.get<Store>(`/api/stores/get/${id}`);
  }

  public editStore(store: Store): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`/api/stores/edit/${store._id}`, store);
  }

  public addStore(store: Store): Observable<Store> {
    console.log(store);
    return this.http.post<Store>('/api/stores/add', store);
  }

  public deleteStore(storeId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/api/stores/delete/${storeId}`);
  }
}
