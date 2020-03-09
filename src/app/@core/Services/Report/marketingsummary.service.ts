import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MarketingSummaryService {
    private _getSummaryReport = `${environment.apiUrl + environment.urlPages.marketingsummary.summaryreport}`;
    private _getExport = `${environment.apiUrl + environment.urlPages.marketingsummary.export}`;
    constructor(private http: HttpClient) { }
  
    getSummaryReport(searchDto) {
        return this.http.post<any>(this._getSummaryReport, searchDto);
    }

    exportReport(searchDto) {
        return this.http.post<any>(this._getExport, searchDto);
    }
}
