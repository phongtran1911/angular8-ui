import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EditRescueJobService {
    private _getLastmilestatus = `${environment.apiUrl + environment.urlPages.edit_rescue_job.lastmilestatus}`;
    private _getLastmilesubstatus = `${environment.apiUrl + environment.urlPages.edit_rescue_job.lastmilesubstatus}`;
    private _getPiorityByStatusName = `${environment.apiUrl + environment.urlPages.edit_rescue_job.PiorityByStatusName}`;
    private _getAllPriority = `${environment.apiUrl + environment.urlPages.edit_rescue_job.AllPriority}`;
    private _getNewRescueJobID = `${environment.apiUrl + environment.urlPages.edit_rescue_job.NewRescueJobID}`;
    private _checkCreateRescueJobByDO = `${environment.apiUrl + environment.urlPages.edit_rescue_job.CreateRescueJobByDO}`;
    private _getByOdSaleOrderId = `${environment.apiUrl + environment.urlPages.edit_rescue_job.getByOdSaleOrderId}`;
    private _findOneOdDoNewData = `${environment.apiUrl + environment.urlPages.edit_rescue_job.findOneOdDoNewData}`;
    private _saveOrUpdate = `${environment.apiUrl + environment.urlPages.edit_rescue_job.saveRescueJob}`;
    constructor(private http: HttpClient) { }
    
    getLastMileStatus() {
        return this.http.get(this._getLastmilestatus);
    }
    getLastmileSubStatus(status){
        return this.http.post(this._getLastmilesubstatus,status);
    }

    getPiorityByStatusName(search) {
        return this.http.post(this._getPiorityByStatusName, search);
    }

    getAllPriority()
    {
        return this.http.get(this._getAllPriority);
    }
    getNewRescueJobID() {
        return this.http.get(this._getNewRescueJobID);
    }
    checkCreateRescueJobByDO(search) {
        return this.http.post(this._checkCreateRescueJobByDO, search);
    }

    getByOdSaleOrderId(id) {
        return this.http.get(this._getByOdSaleOrderId + id);
    }
    findOneOdDoNewDataBySearchDto(search) {
        return this.http.post(this._findOneOdDoNewData, search);
    }
    saveOrUpdate(dto) {
        return this.http.post(this._saveOrUpdate, dto);
    }
}