import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DeliveryService {
  private _getDelivery = `${environment.apiUrl}api/reportdelivery/search/1/25`;

  constructor(private http: HttpClient) { }

  getDelivery(searchDto) {
      return this.http.post<any>(this._getDelivery, searchDto);
  }

}
