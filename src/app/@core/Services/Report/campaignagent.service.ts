import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../urlApi';

@Injectable()
export class CampaignAgentService {
    private _getCampaignAgentReport = `${environment.apiUrl + environment.urlPages.campaignagent.agentreport}`;
    private _getExport = `${environment.apiUrl + environment.urlPages.campaignagent.export}`;
    private _getCampaignAll = `${environment.apiUrl + environment.urlPages.campaignagent.allcampaign}`;
    constructor(private http: HttpClient) { }
  
    getCampaignAgentReport(searchDto) {
        return this.http.post<any>(this._getCampaignAgentReport, searchDto);
    }

    exportReport(searchDto) {
        return this.http.post<any>(this._getExport, searchDto);
    }

    getAllCampaignAll() {
        return this.http.get<any>(this._getCampaignAll);
    }
}
