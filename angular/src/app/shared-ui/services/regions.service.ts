import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class RegionsService {
  regions = 'regions';
  constructor(private apiService: ApiService) { }

  public saveRegionInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.regions}/saveRegionInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getRegionsList(param: object): Observable<any> {
    return this.apiService.post(`${this.regions}/getRegionsList`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public regionAlreadyExists(param: any): any {
    return this.apiService.post(`${this.regions}/regionAlreadyExists`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteRegion(param: object): Observable<any> {
    return this.apiService.delete(`${this.regions}/deleteRegion`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
