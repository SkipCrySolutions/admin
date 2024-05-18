import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getUsers() {
    const url = `/api/users`;
    return this.http.get(url);
  }

  public getUserById(id: string) {
    const url = `/api/users/${id}`;
    return this.http.get(url);
  }
}
