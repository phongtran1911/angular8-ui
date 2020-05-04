import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LeadService } from '../../../@core/Services/Report/lead.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent implements OnInit {
  settings = {    
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      leadId: {
        title: 'Lead_ID',
        type: 'number'
      },
      clickId: {
        title: 'Click_ID',
        type: 'string',
      },
      createDate: {
        title: 'CREATE_DATE',
        type: 'string',        
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
      city: {
        title: 'AGENCY',
        type: 'string',
      },
      prodName: {
        title: 'OFFER',
        type: 'string',
      },
      name: {
        title: 'CUSTOMER',
        type: 'string',
      },
      phone: {
        title: 'PHONE',
        type: 'number',
      },
      payout: {
        title: 'PAYOUT',
        type: 'string',
      },
      incommingStatus: {
        title: 'STATUS',
        type: 'string',
      },
      response: {
        title: 'SUB_STATUS',
        type: 'string',
      },
      postbackStatus: {
        title: 'POSTBACK_STATUS',
        type: 'string',
      },
      postbackMessage: {
        title: 'POSTBACK_MESSAGE',
        type: 'string',
      },
      modifyDate: {
        title: 'UPDATE_DATE',
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
  loading = false;
  source: LocalDataSource = new LocalDataSource();

  constructor(private _call: LeadService) {  
  }
  leads;
  ngOnInit(): any {
    this.loading = true;
    this._call.getLead({})
      .subscribe(
        res => {
          this.leads = res.content;
          this.source.load(this.leads);
          setTimeout(() => this.loading = false, 1000);
        },
        err => {
          localStorage.removeItem('token')
          window.location.href = 'auth/login';
        }
      )
  }
  searchObject = {
    createDateTo: "",
    createDateFrom: "",
    updateDateTo: "",
    updateDateFrom: "",
    leadId: "",
    clickId: "",
    customer: "",
    phone: "",
    payout:"",
    subStatus: [],
    postbackStatus: [],
    postbackMessage: "",
    cities: [],
    advertiserIsOffers: [],
    tmsStatuses: []
  };
  export2Csv(): void {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.leads[0]);
    let csv = this.leads.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
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
  myBlobObject;
  export() {
    this._call.getExport(this.searchObject)
        .subscribe(
          res => {
            this.myBlobObject = new Blob([res], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          },
          err => {
            this.myBlobObject = [];
          }
        )
  }
}
