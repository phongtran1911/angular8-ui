import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import {
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
  } from '@nebular/theme';
import * as moment from 'moment';
import { CampaignAgentService } from '../../../@core/Services/Report/campaignagent.service';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
    selector: 'ngx-campaignagent',
    templateUrl: './campaignagent.component.html',
    styleUrls: ['./campaignagent.component.scss'],
  })
export class CampaignAgentComponent implements OnInit {
    config: ToasterConfig;
    destroyByClick = true;
    duration = 3000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'warning';
    date = {
        start: new Date(),
        end: new Date()
      };
    loading = false;
    ngOnInit(): void {
        this.date.start.setHours(0,0,0,0);
        this.date.end.setHours(23,59,59,999);  
        this.getAllCampaing();
    }
    constructor(private _call: CampaignAgentService,private toastrService: NbToastrService){

    }
    listCampaing;
    getAllCampaing() {
        this._call.getAllCampaignAll()
            .subscribe(
                res => this.listCampaing = res,
                err => console.log(err)
            )
    };
    data = [];
    searchDto = {
        startDate: null,
        endDate: null,
        listCpId: [],
        pageIndex: 1,
        pageSize: 25,
        userName: null,
        isSortUserName: null,
        isSortTotalDayLead: null,
        isSortDayApproved: null,
        isSortTotalProduct: null,
        isSortDayTotalSoAmount: null,
        isSortDayRejected: null,
        isSortDayDelivered: null,
        isSortDayIntransit: null,
        isSortDayReturned: null,
        isSortNewLead: null,
        isSortUpsaleOrder: null
    }
    searchByDto() {
        this.loading = true;
        this.data = [];
        this.searchDto.startDate = null;
        this.searchDto.endDate = null;
        if (this.date != null) {
            if(Object.keys(this.date).length !== 0 && this.date.constructor === Object) {
                this.searchDto.startDate = moment(this.date.start).format('YYYY-MM-DDTHH:mm:ssZ');
                this.searchDto.endDate = moment(this.date.end).format('YYYY-MM-DDTHH:mm:ssZ');   
            }
        }
        if(this.searchDto.listCpId.length == 0)
        {
            this.showToast(this.status, "Hi There!", "Choose a campaign, please!");
            return;
        }
        this._call.getCampaignAgentReport(this.searchDto)
            .subscribe(
                res => {
                    //this.data = res.content;
                    for(let i = 0; i < res.content.length; i++)
                    {
                        let a = res.content[i];
                        var result = {
                            userName: a.userName,
                            totalDayLead: a.totalDayLead,
                            newLead: a.newLead,
                            dayApproved: a.dayApproved,
                            CV: ((a.adayApproved/a.totalDayLead) *100) > 0 ? (a.dayApproved/a.totalDayLead) *100 : 0 ,
                            upsellOrder: a.upsellOrder,
                            upsellprogress: ((a.upsellOrder / a.dayApproved) * 100) > 0 ? ((a.upsellOrder / a.dayApproved) * 100) : 0,
                            totalProduct: a.totalProduct,
                            dayTotalSoAmount: a.dayTotalSoAmount,
                            dayRejected: a.dayRejected,
                            progressRejected: ((a.dayRejected / a.totalDayLead) * 100) > 0 ? ((a.dayRejected / a.totalDayLead) * 100) : 0,
                            AOV: (a.dayTotalSoAmount / a.dayApproved) > 0 ? ((a.dayTotalSoAmount / a.dayApproved)) : 0,
                            dayTrash: a.dayTrash,
                            progresstrash: ((a.dayTrash / a.totalDayLead) * 100) > 0 ? ((a.dayTrash / a.totalDayLead) * 100) : 0,
                            dayUncall: a.dayUncall,
                            progressUncall: ((a.dayUncall / a.totalDayLead) * 100) > 0 ? ((a.dayUncall / a.totalDayLead) * 100) : 0,
                            dayDelivered: a.dayDelivered,
                            progressDeli: ((a.dayDelivered / a.dayApproved) * 100) > 0 ? ((a.dayDelivered / a.dayApproved) * 100) : 0,
                            dayIntransit: a.dayIntransit,
                            progressIntr: ((a.dayIntransit / a.dayApproved) * 100) > 0 ? ((a.dayIntransit / a.dayApproved) * 100) : 0,
                            dayReturned: a.dayReturned,
                            progressReturn: ((a.dayReturned / a.dayApproved) * 100) > 0 ? ((a.dayReturned / a.dayApproved) * 100) : 0,
                            upsellValue: a.upsellValue
                        };
                        this.data.push(result);
                    }
                    this.source.load(this.data);
                    setTimeout(() => this.loading = false, 1000);
                },
                err => console.log(err)
            )
    };
    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
          status: type,
          destroyByClick: this.destroyByClick,
          duration: this.duration,
          hasIcon: this.hasIcon,
          position: this.position,
          preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `${title}` : '';
    
        this.toastrService.show(
          body,
          `${titleContent}`,
          config);
    }
    source: LocalDataSource = new LocalDataSource();
    settings = {    
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {
          userName: {
            title: 'Operator',
            type: 'string'
          },
          totalDayLead: {
            title: 'Leads',
            type: 'number',
          },
          newLead: {
            title: 'Fresh lead',
            type: 'number',        
            hidden: true
          },
          dayApproved: {
            title: 'Approved',
            type: 'number',
          },
          CV: {
            title: 'CV',
            type: 'number',
          },
          upsellOrder: {
            title: 'Upsale order',
            type: 'number',
          },
          upsellprogress: {
            title: '% Upsale',
            type: 'number',
          },
          totalProduct: {
            title: 'Product sold',
            type: 'number',
          },
          dayTotalSoAmount: {
            title: 'Total amount',
            type: 'number',
          },
          dayRejected: {
            title: 'Rejected',
            type: 'number',
          },
          progressRejected: {
            title: '%',
            type: 'number',
          },
          AOV: {
            title: 'AOV',
            type: 'number',
          },
          dayTrash: {
            title: 'Trash',
            type: 'number'
          },
          progresstrash: {
            title: '%',
            type: 'number | 2'
          },
          dayUncall: {
            title: 'Uncall',
            type: 'number'
          },
          progressUncall: {
            title: '%',
            type: 'number'
          },
          dayDelivered: {
            title: 'Delivered',
            type: 'number'
          },
          progressDeli: {
            title: '%',
            type: 'number'
          },
          dayIntransit: {
            title: 'Intransit',
            type: 'number'
          },
          progressIntr: {
            title: '%',
            type: 'number | 2'
          },
          dayReturned: {
            title: 'Returned',
            type: 'number'
          },
          progressReturn: {
            title: '%',
            type: 'number'
          },
          upsellValue: {
            title: 'Upsale value',
            type: 'number'
          },
        },
      };
    export2Csv(): void {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(this.data[0]);
        let csv = this.data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
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