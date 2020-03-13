import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
}