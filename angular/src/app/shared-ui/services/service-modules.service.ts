import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceModulesService {

  serviceModules = 'serviceModules';
  constructor(private apiService: ApiService) { }

  public saveServiceInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.serviceModules}/saveServiceInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getServiceModules(param?: object): Observable<any> {
    return this.apiService.post(`${this.serviceModules}/getServiceModules`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteService(param: object): Observable<any> {
    return this.apiService.delete(`${this.serviceModules}/deleteService`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
