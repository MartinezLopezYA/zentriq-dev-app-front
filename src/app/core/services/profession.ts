import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfessionsInterface, ProfessionInCategoryInterface } from '../interfaces/profession.interface';

@Injectable({
  providedIn: 'root'
})
export class Profession {

  private API_BACK: string = environment.apiUrl;

  private http = inject(HttpClient);

  getAllProfessions(): Observable<GetProfessionsInterface[]> {
    return this.http.get<GetProfessionsInterface[]>(`${this.API_BACK}/professions/v1`);
  }

  getProfessionsByCategory(professioncategoryuuid: string): Observable<ProfessionInCategoryInterface[]> {
    return this.http.get<ProfessionInCategoryInterface[]>(`${this.API_BACK}/professions/v1/category/${professioncategoryuuid}/active`);
  }

}
