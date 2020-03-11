import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AllRescuesService } from '../../../../@core/Services/RescueJob/allrescues.service';
import { FunctionAllService } from '../../../../@core/utils/index';
import { NbWindowService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-tab1',
    templateUrl: './tab1.component.html',
  })
export class Tab1Component implements OnInit {
    loading = false;
    constructor(private _call: AllRescuesService,
        private windowService: NbWindowService, 
        private _func: FunctionAllService,
        private cookies: CookieService,
        private _router: Router) {  
    }
    rescues;
    selectedRescue = [];
    userAssign;
    goEditRescue(){
      this._router.navigate(['/pages/rescuejob/editrescuejob']);
    }
    onUserRowSelect(event) {
      this.selectedRescue = event.selected;
    }
    openWindowAssign(assign) {
        this.windowService.open(
          assign,
          {
            title: 'Notification',
          }
        )
    }
    openWindowTake(take) {
      this.windowService.open(
        take,
        {
          title: 'Notification',
        }
      )
    }
    onUserAssignSelect(event, assign) {
      this.userAssign = event.data;
      this.openWindowAssign(assign);
    }
    Assigned() {
      for(let i = 0; i < this.selectedRescue.length; i++)
      {
        this.selectedRescue[i].userNote = "Agent is assigned";
      }
      this._call.saveRescueUser(this.selectedRescue, this.userAssign.userId)
          .subscribe(
            res => {
                this._func.showToast('success', 'Hi There!', 'Assign ' + this.selectedRescue.length + ' record.');
                location.reload();
            },
            err => this._func.showToast('danger', 'Hi there!','Assign rescues error.')
          )
    }
    Released() {
        for (var i = 0; i < this.selectedRescue.length; i++) {
                this.selectedRescue[i].userNote = "Teamlead is released";
        }
        this._call.saveRescueUser(this.selectedRescue, 0)
            .subscribe(
                res => {
                    if(res == null || res == ""){
                        this._func.showToast('warning', 'Hi there!','Sorry, You do not release this rescue job. Please reloads the page');
                    }else{
                        // Notify
                        this._func.showToast('info', 'Hi There!','Release ' + this.selectedRescue.length + ' record.');
                        this.refresh();
                    }
                },
                err => this._func.showToast('danger', 'Hi there!','Release rescues error.')
            )
    }
    Taked() {
      for (var i = 0; i < this.selectedRescue.length; i++) {
        this.selectedRescue[i].userNote = "Takes a Rescue Job";
      }
      this._call.saveRescueUser(this.selectedRescue, localStorage.getItem('userId'))
          .subscribe(
            res => {
              if(res == null || res == ""){
                this._func.showToast('danger', 'Hi there!','This rescue job has been assigned to others or rescue job is closed.');
              }else{
                  // Notify
                  this._func.showToast('info', 'Hi There!','Take ' + res + ' record.');
                  this.refresh();
              }
            },
            err => this._func.showToast('danger', 'Hi there!','Take rescues error.')
          )
    }
    refresh() {
        this.search();
    }
    search() {
      this.loading = true;
        this._call.getRescues({})
            .subscribe(
                res => {                    
                    this.rescues = res.content;
                    this.source.load(this.rescues);
                    setTimeout(() => this.loading = false, 1000);
                },
                err => {
                    localStorage.removeItem('token')
                    window.location.href = 'auth/login';
                }
            )
    }
    currentUser = JSON.parse(this.cookies.get('currentUser'));
    ngOnInit(): void {
      this.search();
    }
    settingsUser = {
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      columns: {
        userName: {
          title: 'User Name',
          type: 'string'
        },
        fullname: {
          title: 'Họ tên',
          type: 'string'
        },
        email: {
          title: 'Email',
          type: 'string'
        }
      }
    }
    openWindow(contentTemplate) {
      this.windowService.open(
        contentTemplate,
        {
          title: 'Chọn CS Agent',
        },      
      );
      this._call.getUserByFullName({listRescue: [], csAgentName: ""})
          .subscribe(
            res => this.sourceUser.load(res.content),
            err => console.log(err)
          )    
    }
    openWindowRelease(release){
        var fail = 0;
        for (var i = 0; i < this.selectedRescue.length; i++) {
            if (this.selectedRescue[i].jobStatus == 7 || this.selectedRescue[i].assigned == null) { //check neu rescue job status close thi khong release
                fail++;
                this._func.showToast('warning','Hi there!', 'Rescue Job can not be released.');
                break;
            }
        }
        if(fail == 0)
        {
            this.windowService.open(
                release,
                {
                  title: 'Notification',
                },      
              );
        }        
    }
    settings = {  
      selectMode: 'multi', 
      mode: 'external', 
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      columns: {
        createDate: {
          title: 'DO_ID',
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
        updateDate: {
          title: 'DO_CODE',
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
        id: {
          title: 'FFM_CODE',
          type: 'string',
        },
        priority: {
          title: 'TRACKING_CODE',
          type: 'string',
        },
        lastmileReason: {
          title: 'SO_ID',
          type: 'string',
        },
        lastmileReasonDetail: {
          title: 'STOCK',
          type: 'string',
        },
        jobComment: {
          title: 'HUB',
          type: 'string',
        },
        userNote: {
          title: 'CARRIER',
          type: 'string',
        },      
      },
    };
    source: LocalDataSource = new LocalDataSource();
    sourceUser: LocalDataSource = new LocalDataSource();
  }

