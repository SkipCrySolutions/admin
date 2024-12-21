import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public user = signal(null);

  constructor() {}
}
