import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../urlApi';

@Injectable()
export class AllRescuesService {
    private _getRescue = `${environment.apiUrl + environment.urlPages.allrescues.rescuesjob}`;
    private _getUserFullName = `${environment.apiUrl + environment.urlPages.allrescues.userfullname}`;
    private _saveRescueUser = `${environment.apiUrl + environment.urlPages.allrescues.saveRescueUser}`;
    private _allrcstatusbytype = `${environment.apiUrl + environment.urlPages.allrescues.allrcstatusbytype}`;
    private _allsubstatusbytype = `${environment.apiUrl + environment.urlPages.allrescues.allsubstatusbytype}`;
    private _checkById = `${environment.apiUrl + environment.urlPages.allrescues.checkById}`;
    private _listrescuehistory = `${environment.apiUrl + environment.urlPages.allrescues.ListRescueHistory}`;
    private _lstsaleorder = `${environment.apiUrl + environment.urlPages.allrescues.ListSaleOrder}`;
    private _lstdeliveryorder = `${environment.apiUrl + environment.urlPages.allrescues.ListDeliveryOrder}`;
    private _AllBpPartner = `${environment.apiUrl + environment.urlPages.allrescues.allbpPartner}`;
    private _listUser = `${environment.apiUrl + environment.urlPages.allrescues.listuser}`;
    private _saveComment = `${environment.apiUrl + environment.urlPages.allrescues.saveComment}`;
    private _LastmileStatusAndLastmileSubStatus = `${environment.apiUrl + environment.urlPages.allrescues.LastmileStatusAndLastmileSubStatus}`;
    private _CsStatusByRescueJobStatus = `${environment.apiUrl + environment.urlPages.allrescues.CsStatusByRescueJobStatus}`;
    private _saveRescueJobActivity = `${environment.apiUrl + environment.urlPages.allrescues.saveRescueJobActivity}`;
    private _getMyRescues = `${environment.apiUrl + environment.urlPages.allrescues.myrescuejob}`;
    private _getLastmilestatus = `${environment.apiUrl + environment.urlPages.allrescues.lastmilestatus}`;
    private _getLastmilesubstatus = `${environment.apiUrl + environment.urlPages.allrescues.lastmilesubstatus}`;
    private _getPiorityByStatusName = `${environment.apiUrl + environment.urlPages.allrescues.PiorityByStatusName}`;
    private _getCssubstatusbystatusid = `${environment.apiUrl + environment.urlPages.allrescues.Cssubstatusbystatusid}`;
    private _getCsStatusbyType = `${environment.apiUrl + environment.urlPages.allrescues.CsStatusbyType}`;
    private _getRescueJobById = `${environment.apiUrl + environment.urlPages.allrescues.RescueJobById}`;
    private _gettakeRescueJob = `${environment.apiUrl + environment.urlPages.allrescues.takeRescueJob}`;
    private _getfile = `${environment.apiUrl + environment.urlPages.allrescues.getfile}`;
    constructor(private http: HttpClient) { }
    
    getRescues(searchDto) {
        return this.http.post(this._getRescue, searchDto);
    }

    getUserByFullName(searchDto) {
        return this.http.post(this._getUserFullName, searchDto);
    }

    saveRescueUser(priority, id) {
        return this.http.post(this._saveRescueUser + id,priority);
    }
    getAllrcstatusbytype(type) {
        return this.http.get(this._allrcstatusbytype + type);
    }
    getAllsubstatusbytype(type) {
        return this.http.get(this._allsubstatusbytype + type);
    }

    checkById(id) {
        return this.http.get(this._checkById + id);
    }

    getListRescueHistory(dto) {
        return this.http.post(this._listrescuehistory, dto);
    }

    getListDeliveryOrder(dto) {
        return this.http.post(this._lstdeliveryorder, dto);
    }
    getListSaleOrder(dto) {
        return this.http.post(this._lstsaleorder, dto);
    }
    getAllBpPartner(pageIndex, pageSize) {
        return this.http.get(this._AllBpPartner + pageIndex + '/' + pageSize);
    }
    getListUsers() {
        return this.http.get(this._listUser);
    }
    saveComment(dto) {
        return this.http.post(this._saveComment, dto);
    }
    updateLastmileStatusAndLastmileSubStatus(dto) {
        return this.http.post(this._LastmileStatusAndLastmileSubStatus, dto);
    }

    getCsStatusByRescueJobStatus(status) {
        return this.http.get(this._CsStatusByRescueJobStatus + status);
    }
    call(phone) {
        return this.http.post("http://183.91.11.164:8080/pbx-rest/call",phone);
    }
    uncall(phone) {
        return this.http.post("http://183.91.11.164:8080/pbx-rest/hangup", phone);
    }
    saveRescueJobActivity(activity) {
        return this.http.post(this._saveRescueJobActivity, activity);
    }
    getMyRescues(dto, pageSize) {
        return this.http.post(this._getMyRescues + pageSize,dto);
    }
    getLastMileStatus() {
        return this.http.get(this._getLastmilestatus);
    }
    getLastmileSubStatus(status){
        return this.http.post(this._getLastmilesubstatus,status);
    }
    getPiorityByStatusName(search) {
        return this.http.post(this._getPiorityByStatusName, search);
    }
    getCssubstatusbystatusid(id) {
        return this.http.get(this._getCssubstatusbystatusid + id);
    }
    getCsStatusbyType(id) {
        return this.http.get(this._getCsStatusbyType + id);
    }
    getRescueJobById(id) {
        return this.http.get(this._getRescueJobById + id);
    }
    takeRescueJob(dto) {
        return this.http.post(this._gettakeRescueJob,dto);
    }
    getExport(searchDto) {
        return this.http.post(this._getfile,searchDto,{headers:{'Content-type': 'application/json'},responseType : 'arraybuffer',});
    }
}