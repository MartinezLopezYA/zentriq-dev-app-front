import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignRolesResponse, CreateUserInterface, GetUserByUudInterface, GetUserInterface, UpdateUserInterface, UpdateUserStatusInterface, UserProfileInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class User {

  private API_AUTH: string = environment.apiAuth;
  private API_BACK: string = environment.apiUrl;

  public _currentUser = signal<UserProfileInterface | null>(null);

  public currentUser = computed(() => this._currentUser());

  private http = inject(HttpClient);

  getProfile(): Observable<UserProfileInterface> {
    return this.http.get<UserProfileInterface>(`${this.API_AUTH}/v1/profile`);
  }

  getAllUsers(): Observable<GetUserInterface[]> {
    return this.http.get<GetUserInterface[]>(`${this.API_BACK}/users/v1`);
  }

  addUser(userData: CreateUserInterface): Observable<GetUserInterface> {
    return this.http.post<GetUserInterface>(`${this.API_BACK}/users/v1`, userData);
  }

  updateUser(useruuid: string, userData: UpdateUserInterface): Observable<GetUserByUudInterface> {
    return this.http.patch<GetUserByUudInterface>(`${this.API_BACK}/users/v1/${useruuid}`, userData);
  }

  changeStatus(useruuid: string): Observable<UpdateUserStatusInterface> {
    return this.http.patch<UpdateUserStatusInterface>(`${this.API_BACK}/users/v1/${useruuid}/status`, {})
  }

  assignRoles(useruuid: string, roles: string[]): Observable<AssignRolesResponse> {
    return this.http.post<AssignRolesResponse>(`${this.API_BACK}/users/v1/${useruuid}/assign-roles`, roles );
  }

  removeUser(useruuid: string): Observable<UpdateUserStatusInterface> {
    return this.http.delete<UpdateUserStatusInterface>(`${this.API_BACK}/users/v1/${useruuid}/remove`)
  }

}
