import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(value: string) {
    const url = `/api/users/${value}`;
    return this.http.get(url);
  }

  public getUserById(id: string, code: string): Observable<User> {
    const url = `/api/users/get/${id}/${code}`;
    return this.http.get<User>(url);
  }

  public addUser(user: User, edit: boolean) {
    console.log('user => ', user);
    const editUrl = `/api/users/editFromAdmin`;
    const newUrl = `/api/users/signup`;
    return edit ? this.http.put(editUrl, user) : this.http.post(newUrl, user);
  }

  public getLatLongFromPincode(pincode: number) {
    const apiKey = `c7cf3b21089645cc8fc814eb6a22ae99`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`;
    // const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India`;

    return this.http.get(url).pipe(
      map(
        (response: any) => {
          console.log('getLatLongFromPincode ', response.results);
          const results = response.results;
          if (results.length > 0) {
            console.log('results ===>>> ', results);
            const indiaPincode = results.find(
              (t: any) => t.formatted.indexOf('India') > -1
            );
            console.log('indiaPincode => ', indiaPincode);
            if (indiaPincode) {
              const latlong = indiaPincode.geometry;
              const latitude = latlong.lat;
              const longitude = latlong.lng;
              return { latitude, longitude };
            }
            return null;
          } else {
            throw new Error('No location found for the provided pincode.');
          }
        },
        catchError(() => {
          return throwError(
            () => new Error('No location found for the provided pincode.')
          );
        })
      )
    );
  }
}
