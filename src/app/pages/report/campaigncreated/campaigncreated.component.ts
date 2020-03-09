import { Component,  OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { CampaignCreatedService } from '../../../@core/Services/Report/campaigncreated.service';
import {
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
  } from '@nebular/theme';
import * as moment from 'moment';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
    selector: 'ngx-campaigncreated',
    templateUrl: './campaigncreated.component.html',
    styleUrls: ['./campaigncreated.component.scss'],
  })
  export class CampaignCreatedComponent implements OnInit {
    config: ToasterConfig;
    destroyByClick = true;
    duration = 3000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'warning';
    ngOnInit(): void {
        this.date.start.setHours(0,0,0,0);
        this.date.end.setHours(23,59,59,999);  
        this.getAllCampaing();
    }
    constructor(private _call: CampaignCreatedService,private toastrService: NbToastrService){

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
            this.showToast(this.status, "Hi There!", "Choose a campaign, please!");
            return;
        }
        this._call.getCampaignCreatedReport(this.searchDto)
            .subscribe(
                res => {
                    this.data = res;
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
  }