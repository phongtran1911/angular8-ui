import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DeliveryService } from '../../../@core/Services/Report/delivery.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  settings = {    
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      doId: {
        title: 'DO_ID',
        type: 'number'
      },
      doCode: {
        title: 'DO_CODE',
        type: 'string',
      },
      ffmCode: {
        title: 'FFM_CODE',
        type: 'string',
      },
      trackingCode: {
        title: 'TRACKING_CODE',
        type: 'string',
      },
      soId: {
        title: 'SO_ID',
        type: 'string',
      },
      ffmName: {
        title: 'STOCK',
        type: 'string',
      },
      warehouseName: {
        title: 'HUB',
        type: 'string',
      },
      carrierName: {
        title: 'CARRIER',
        type: 'string',
      },
      customerName: {
        title: 'CUSTOMER_NAME',
        type: 'string',
      },
      customerPhone: {
        title: 'PHONE',
        type: 'number',
      },
      address: {
        title: 'ADDRESS',
        type: 'string',
      },
      product: {
        title: 'PRODUCTS',
        type: 'string',
      },
      amountcod: {
        title: 'TOTAL_COD',
        type: 'string',
      },
      statusName: {
        title: 'STATUS',
        type: 'string',
      },
      userName: {
        title: 'AGENT',
        type: 'string',
      },
      createDateSo: {
        title: 'SO_CREATEDATE',
        type: 'date',        
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return moment(value).format('DD/MM/YYYY HH:mm');
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return moment(cell).format('DD/MM/YYYY HH:mm').match(search);
          }
        }
      },
      createDateDo: {
        title: 'DO_CREATEDATE',
        type: 'date',        
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return moment(value).format('DD/MM/YYYY HH:mm');
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return moment(cell).format('DD/MM/YYYY HH:mm').match(search);
          }
        }
      },
      updateDateDo: {
        title: 'DO_UPDATEDATE',
        type: 'date',        
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return moment(value).format('DD/MM/YYYY HH:mm');
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return moment(cell).format('DD/MM/YYYY HH:mm').match(search);
          }
        }
      },
      updateDateSo: {
        title: 'SO_UPDATEDATE',
        type: 'date',        
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return moment(value).format('DD/MM/YYYY HH:mm');
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return moment(cell).format('DD/MM/YYYY HH:mm').match(search);
          }
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private _call: DeliveryService) {  
  }
  delivery;
  loading = false;
  ngOnInit(): any {
    this.loading = true;
    this._call.getDelivery({})
      .subscribe(
        res => {
          this.delivery = res.content;
          this.source.load(this.delivery);
          setTimeout(() => this.loading = false, 1000);
        },
        err => {
          localStorage.removeItem('token')
          window.location.href = 'auth/login';
        }
      )
  }
  export2Csv(): void {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.delivery[0]);
    let csv = this.delivery.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
