import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ManageServicesService {
  manageServices = 'manageServices';
  constructor(private apiService: ApiService) { }

  public saveServiceInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.manageServices}/saveServiceInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getManageServices(param?: object): Observable<any> {
    return this.apiService.post(`${this.manageServices}/getManageServices`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteService(param: object): Observable<any> {
    return this.apiService.delete(`${this.manageServices}/deleteService`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
