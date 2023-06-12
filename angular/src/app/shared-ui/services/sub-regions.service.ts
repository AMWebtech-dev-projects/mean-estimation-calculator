import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubRegionsService {
  regions = 'subregions';
  constructor(private apiService: ApiService) { }

  public saveSubRegionInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.regions}/saveSubRegionInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getSubRegionsList(): Observable<any> {
    return this.apiService.get(`${this.regions}/getSubRegionsList`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public countryCodeExists(param: any): any {
    return this.apiService.post(`${this.regions}/countryCodeExists`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteSubRegion(param: object): Observable<any> {
    return this.apiService.delete(`${this.regions}/deleteSubRegion`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
