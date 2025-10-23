import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfessionsCategoryInterface } from '../interfaces/professioncategory.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessionCategory {

  private API_BACK: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfessionCategories(): Observable<GetProfessionsCategoryInterface[]> {
    return this.http.get<GetProfessionsCategoryInterface[]>(`${this.API_BACK}/professions-category/v1/active`);
  }

}
