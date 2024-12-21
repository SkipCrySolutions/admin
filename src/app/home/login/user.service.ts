import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './franchise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public login(user: any) {
    const url = '/api/users/login';
    return this.http.post<User>(url, user);
  }

  public getUserById(id: string, customerCode: string): Observable<User> {
    const url = `/api/users/get/${id}/${customerCode}`;
    return this.http.get<User>(url);
  }

  public signup(user: any) {
    const url = `/api/users/signup`;
    return this.http.post(url, user);
  }

  public editUser(user: User) {
    const url = `/api/users/edit`;
    return this.http.put(url, user);
  }

  public changePassword(request: any) {
    const url = `/api/users/changePassword`;
    return this.http.post(url, request);
  }
}
