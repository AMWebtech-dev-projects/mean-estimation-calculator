import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageBundlesService {

  manageBundles = 'manageBundles';
  constructor(private apiService: ApiService) { }

  public saveServiceInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.manageBundles}/saveServiceInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getBundlesList(param?: object): Observable<any> {
    return this.apiService.post(`${this.manageBundles}/getBundlesList`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteService(param: object): Observable<any> {
    return this.apiService.delete(`${this.manageBundles}/deleteService`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
