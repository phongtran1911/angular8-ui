import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AllRescuesService {
    private _getRescue = `${environment.apiUrl + environment.urlPages.allrescues.rescuesjob}`;
    private _getUserFullName = `${environment.apiUrl + environment.urlPages.allrescues.userfullname}`;
    private _saveRescueUser = `${environment.apiUrl + environment.urlPages.allrescues.saveRescueUser}`;
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
}