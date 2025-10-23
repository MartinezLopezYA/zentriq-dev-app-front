import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/dev.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityInterface, CountryInterface, DepartmentInterface } from '../../interfaces/global/location.interface';

@Injectable({
  providedIn: 'root'
})
export class Locations {

  private API_BACK: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(`${this.API_BACK}/location/v1/countries`);
  }

  getDepartmentsByCountry(countryuuid: string): Observable<DepartmentInterface[]> {
    return this.http.get<DepartmentInterface[]>(`${this.API_BACK}/location/v1/departments/${countryuuid}`);
  }

  getCitiesByDepartment(departmentuuid: string): Observable<CityInterface[]> {
    return this.http.get<CityInterface[]>(`${this.API_BACK}/location/v1/cities/${departmentuuid}`);
  }


}
