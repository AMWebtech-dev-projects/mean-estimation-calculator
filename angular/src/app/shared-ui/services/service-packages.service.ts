import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicePackagesService {

  servicePackages = 'servicePackages';
  constructor(private apiService: ApiService) { }

  public saveServicePackage(param: object): Observable<any> {
    return this.apiService.post(`${this.servicePackages}/saveServicePackage`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getservicePackages(param?: object): Observable<any> {
    return this.apiService.post(`${this.servicePackages}/getservicePackages`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteService(param: object): Observable<any> {
    return this.apiService.delete(`${this.servicePackages}/deleteService`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
