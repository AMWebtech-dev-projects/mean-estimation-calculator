import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  baseUrl: string = environment.baseUrl;
  currencies = 'currencies';
  constructor(private apiService: ApiService) { }

  public saveCurrencyInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.currencies}/saveCurrencyInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getCurrenciesList(): Observable<any> {
    return this.apiService.get(`${this.currencies}/getCurrenciesList`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public currencyAlreadyExists(param: any): any {
    return this.apiService.post(`${this.currencies}/currencyAlreadyExists`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteCurrency(param: object): Observable<any> {
    return this.apiService.delete(`${this.currencies}/deleteCurrency`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }
}

