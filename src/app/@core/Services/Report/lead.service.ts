import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LeadService {
  private _getLead = `${environment.apiUrl + environment.urlPages.lead.leadreport}`;

  constructor(private http: HttpClient) { }

  getLead(searchDto) {
      return this.http.post<any>(this._getLead, searchDto);
  }

}
