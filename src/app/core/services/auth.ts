import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  API_BACK: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  checkConextion() {
    return this.http.get<any>(`${this.API_BACK}database/test`);
  }

}
