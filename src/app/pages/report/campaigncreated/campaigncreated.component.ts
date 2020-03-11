import { Component,  OnInit } from '@angular/core';
import { CampaignCreatedService } from '../../../@core/Services/Report/campaigncreated.service';
import * as moment from 'moment';
import { FunctionAllService } from '../../../@core/utils/index';
@Component({
    selector: 'ngx-campaigncreated',
    templateUrl: './campaigncreated.component.html',
    styleUrls: ['./campaigncreated.component.scss'],
  })
  export class CampaignCreatedComponent implements OnInit {
    loading = false;
    ngOnInit(): void {
        this.date.start.setHours(0,0,0,0);
        this.date.end.setHours(23,59,59,999);  
        this.getAllCampaing();
    }
    constructor(private _call: CampaignCreatedService,
        private _func: FunctionAllService,){

    }
    listCampaing;
    getAllCampaing() {
        this._call.getAllCampaignAll()
            .subscribe(
                res => this.listCampaing = res,
                err => console.log(err)
            )
    };
    date = {
        start: new Date(),
        end: new Date()
      };
    searchDto = {
        startDate: null,
        endDate: null,
        listCpId: [],
    }
    data = {
        userOnline: 0
    };
    searchByDto() {
        this.loading = true;
        this.data = {
            userOnline: 0      

        };
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
            this._func.showToast('warning', "Hi There!", "Choose a campaign, please!");
            return;
        }
        this._call.getCampaignCreatedReport(this.searchDto)
            .subscribe(
                res => {
                    this.data = res;
                    setTimeout(() => this.loading = false, 1000);
                },
                err => console.log(err)
            )
    };
  }