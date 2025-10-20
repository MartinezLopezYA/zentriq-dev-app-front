import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class User {

  private API_AUTH: string = environment.apiAuth;
  private API_BACK: string = environment.apiUrl;

  public _currentUser = signal<UserProfileInterface | null>(null);

  public currentUser = computed(() => this._currentUser());

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfileInterface> {
    return this.http.get<UserProfileInterface>(`${this.API_AUTH}/v1/profile`);
  }

}
