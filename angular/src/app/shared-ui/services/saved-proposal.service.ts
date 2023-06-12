import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SavedProposalService {

  proposal = 'proposal';
  constructor(private apiService: ApiService) { }

  public saveProposal(param: object): Observable<any> {
    return this.apiService.post(`${this.proposal}/saveProposal`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getProposal(param?: object): Observable<any> {
    return this.apiService.post(`${this.proposal}/getProposal`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // public regionAlreadyExists(param: any): any {
  //   return this.apiService.post(`${this.regions}/regionAlreadyExists`, param).pipe(
  //     map((data) => {
  //       return data;
  //     })
  //   );
  // }

  public deleteProposal(param: object): Observable<any> {
    return this.apiService.delete(`${this.proposal}/deleteProposal`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
