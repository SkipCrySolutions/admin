import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from './franchise.model';

@Injectable({
  providedIn: 'root',
})
export class FranchiseService {
  constructor(private http: HttpClient) {}

  public login(user: any) {
    const url = '/api/stores/login';
    return this.http.post<Store>(url, user);
  }

  public getUserById(id: string, customerCode: string): Observable<Store> {
    const url = `/api/stores/get/${id}/${customerCode}`;
    return this.http.get<Store>(url);
  }

  public changePassword(request: any) {
    const url = `/api/stores/changePassword`;
    return this.http.post(url, request);
  }
}
