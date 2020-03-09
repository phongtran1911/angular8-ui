import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RescuePerformanceService } from '../../../@core/Services/Report/rescueperformance.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class RescuePerformanceComponent implements OnInit {
  settings = {    
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: true,
    columns: {
        date: {
        title: 'DATE',
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
      csagentDisplayName: {
        title: 'CS Agent',
        type: 'string',
      },
      totalRescueJob: {
        title: 'Total rescue job',
        type: 'number',
      },
      rescueJobProportion: {
        title: '% Rescue job Proportion',
        type: 'number',
      },
      calledRescueJob: {
        title: 'Called Rescue Job',
        type: 'number',
      },
      calledRate: {
        title: 'Called Rate',
        type: 'number',
      },
      successfulRescueJob: {
        title: 'Successful Rescue Job',
        type: 'number',
      },
      successfulRescueRate: {
        title: 'Successful rescue Rate',
        type: 'number',
      },
      sucessfulJobProportion: {
        title: '% Successful job Proportion',
        type: 'number',
      },
      avgTimeToRescue: {
        title: 'Avg. Time to Rescue(s)',
        type: 'string',        
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return moment(value).format('DD HH:mm');
        },
        filterFunction: (cell?: any, search?: string) => {
          if (search.length > 0) {
            return moment(cell).format('DD HH:mm').match(search);
          }
        }
      },
      estimatedIncome: {
        title: 'Estimated Income(VND)',
        type: 'number',
      },
      actualIncome: {
        title: 'Actual Income(VND)',
        type: 'number',
      },
      deliveryIncome: {
        title: 'Delivery Income(VND)',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private _call: RescuePerformanceService) {  
  }
  data;
  date = {
      start: new Date(),
      end: new Date()
  };
  searchDto = {
    startDate: null,
    endDate: null,
    listGroupId: [],
    listCsAgentId: []
  };
  listOrGroup;
  listCsAgent;
  ngOnInit(): any {
    this.date.start.setHours(0,0,0,0);
    this.date.end.setHours(23,59,59,999);    
    this.searchByDto();
    this.getAllGroupByOrgId();
  }
  searchByDto() {
        this.searchDto.startDate = null;
        this.searchDto.endDate = null;
        if (this.date != null) {
            if(Object.keys(this.date).length !== 0 && this.date.constructor === Object) {
                this.searchDto.startDate = moment(this.date.start).format('YYYY-MM-DDTHH:mm:ssZ');
                this.searchDto.endDate = moment(this.date.end).format('YYYY-MM-DDTHH:mm:ssZ');   
            }
        }        
        this._call.getPerformancereport(this.searchDto)
            .subscribe(
              res => {
                this.data = res.listResult;
                if(this.data != undefined)
                {
                    this.source.load(this.data);
                }              
              },
              err => {
                localStorage.removeItem('token')
                window.location.href = 'auth/login';
            });
  }
  getAllGroupByOrgId() {
      this._call.getAllGroupByOrgId()
                .subscribe(
                    res => this.listOrGroup = res,
                    err => console.log(err)
                )
  }

  getCsAgentByGroupId() {
      this.searchByDto();
      this._call.getCsAgentByGroupId(this.searchDto)
                .subscribe(
                    res => {
                        if(res == "")
                        {
                            this.listCsAgent = null;    
                        }
                        else
                        {
                            this.listCsAgent = res;
                        }
                    },
                    err => console.log(err)
                )
  }
  search(){
      console.log(this.date);
  }
}
