import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CampaignCreatedService {
    private _getCampaignCreatedReport = `${environment.apiUrl + environment.urlPages.campaigncreated.createdreport}`;
    private _getExport = `${environment.apiUrl + environment.urlPages.campaigncreated.export}`;
    private _getCampaignAll = `${environment.apiUrl + environment.urlPages.campaigncreated.allcampaign}`;
    constructor(private http: HttpClient) { }
  
    getCampaignCreatedReport(searchDto) {
        return this.http.post<any>(this._getCampaignCreatedReport, searchDto);
    }

    exportReport(searchDto) {
        return this.http.post<any>(this._getExport, searchDto);
    }

    getAllCampaignAll() {
        return this.http.get<any>(this._getCampaignAll);
    }
}
