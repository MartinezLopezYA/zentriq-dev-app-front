import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRoleInterface, GetRolesInterface, UpdateRoleStatusInterface } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class Role {

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

  getRoleWithPermissions(roleuuid: string): Observable<GetRolesInterface> {
    return this.http.get<GetRolesInterface>(`${this.API_BACK}/roles/v1/${roleuuid}/permissions`);
  }

  assignPermissions(roleuuid: string, permissions: string[]): Observable<void> {
    return this.http.post<void>(`${this.API_BACK}/roles/v1/${roleuuid}/assign-permissions`, permissions);
  }

  updateRole(roleuuid: string, role: CreateRoleInterface): Observable<GetRolesInterface> {
    return this.http.patch<GetRolesInterface>(`${this.API_BACK}/roles/v1/${roleuuid}`, role);
  }

  changeStatus(roleuuid: string): Observable<UpdateRoleStatusInterface> {
    return this.http.patch<UpdateRoleStatusInterface>(`${this.API_BACK}/roles/v1/${roleuuid}/status`, {})
  }

  removeRole(roleuuid: string): Observable<UpdateRoleStatusInterface> {
    return this.http.delete<UpdateRoleStatusInterface>(`${this.API_BACK}/roles/v1/${roleuuid}/remove`)
  }
}
