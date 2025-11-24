import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRoleInterface, GetRolesInterface } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class Role {

  private API_AUTH: string = environment.apiAuth;
  private API_BACK: string = environment.apiUrl;

  private http = inject(HttpClient);

  getRoles(): Observable<GetRolesInterface> {
    return this.http.get<GetRolesInterface>(`${this.API_BACK}/roles/v1`);
  }

  getRolesActive(): Observable<GetRolesInterface> {
    return this.http.get<GetRolesInterface>(`${this.API_BACK}/roles/v1/active`);
  }

  addRole(role: CreateRoleInterface): Observable<GetRolesInterface> {
    return this.http.post<GetRolesInterface>(`${this.API_BACK}/roles/v1`, role);
  }
}
