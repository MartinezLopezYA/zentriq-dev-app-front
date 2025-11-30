import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPermissionssInterface } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class Permission {

  private API_BACK: string = environment.apiUrl;

  private http = inject(HttpClient);

  getPermissions(): Observable<GetPermissionssInterface[]> {
    return this.http.get<GetPermissionssInterface[]>(`${this.API_BACK}/permissions/v1`);
  }

}
