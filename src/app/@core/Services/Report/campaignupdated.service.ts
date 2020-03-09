import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CampaignUpdatedService {
    private _getCampaignUpdatedReport = `${environment.apiUrl + environment.urlPages.campaignupdated.updatedreport}`;
    private _getExport = `${environment.apiUrl + environment.urlPages.campaignupdated.export}`;
    private _getCampaignAll = `${environment.apiUrl + environment.urlPages.campaignupdated.allcampaign}`;
    constructor(private http: HttpClient) { }
  
    getCampaignUpdatedReport(searchDto) {
        return this.http.post<any>(this._getCampaignUpdatedReport, searchDto);
    }

    exportReport(searchDto) {
        return this.http.post<any>(this._getExport, searchDto);
    }

    getAllCampaignAll() {
        return this.http.get<any>(this._getCampaignAll);
    }
}
