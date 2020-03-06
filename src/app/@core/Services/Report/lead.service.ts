import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LeadService {
  private _loginUrl = `${environment.apiUrl}oauth/token`;
  private _getLead = `${environment.apiUrl}api/reportincominglead/search/1/25`;

  constructor(private http: HttpClient) { }

  getLead(searchDto) {
      return this.http.post<any>(this._getLead, searchDto);
  }

}
