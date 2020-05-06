import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../urlApi';

@Injectable()
export class RescuePerformanceService {
  private _getPerformancereport = `${environment.apiUrl + environment.urlPages.rescueperformance.performancereport}`;
  private _getAllGroupByOrgId = `${environment.apiUrl + environment.urlPages.rescueperformance.AllGroupByOrgId}`;
  private _getCsAgentByGroupId = `${environment.apiUrl + environment.urlPages.rescueperformance.CsAgentByGroupId}`
  constructor(private http: HttpClient) { }

  getPerformancereport(searchDto) {
      return this.http.post<any>(this._getPerformancereport, searchDto);
  }
  getAllGroupByOrgId() {
      return this.http.get<any>(this._getAllGroupByOrgId);
  }
  getCsAgentByGroupId(searchDto) {
      return this.http.post<any>(this._getCsAgentByGroupId,searchDto);
  }
}
