import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../urlApi';

@Injectable()
export class DeliveryService {
  private _getDelivery = `${environment.apiUrl + environment.urlPages.delivery.deliveryreport}`;

  constructor(private http: HttpClient) { }

  getDelivery(searchDto) {
      return this.http.post<any>(this._getDelivery, searchDto);
  }

}
