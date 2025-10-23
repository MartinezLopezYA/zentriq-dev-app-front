import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdentificationTypeInterface } from '../../interfaces/global/identificationtype.interface';

@Injectable({
  providedIn: 'root'
})
export class IdentificationType {
  private API_BACK: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIdentificationTypes(): Observable<IdentificationTypeInterface[]> {
    return this.http.get<IdentificationTypeInterface[]>(`${this.API_BACK}/identification-type/v1`);
  }

}
