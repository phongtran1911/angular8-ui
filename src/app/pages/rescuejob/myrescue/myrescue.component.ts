import { Component, OnInit } from '@angular/core';
import { AllRescuesService } from '../../../@core/Services/RescueJob/allrescues.service';
import { LocalDataSource } from 'ng2-smart-table';
import * as moment from 'moment';
import { FunctionAllService } from '../../../@core/utils';
import {NbWindowService } from '@nebular/theme';
@Component({
  selector: 'ngx-myrescue',
  templateUrl: './myrescue.component.html',
  styleUrls: ['./myrescue.component.scss'],
})
export class MyRescueComponent implements OnInit {
  constructor(public _call: AllRescuesService,
    public _func: FunctionAllService,
    public windowService: NbWindowService,) {

  }
  rcStatusType = { rescueJob: 1, reason: 2 };
  ngOnInit(): void {
    this.search({})
    this.getAllRcStatus(this.rcStatusType.rescueJob)
    this.getAllRcSubStatus(this.rcStatusType.rescueJob)
    this.getAllReasonStatus(this.rcStatusType.reason)
    this.getAllReasonSubStatus(this.rcStatusType.reason)
    this.getAllBpPartner()
    this.getListUsers()
    this.getReturnedReasons(2)
  }
  workspaces = [{
    id: 0,
    name: 'My Rescue Job List',
    delete: false,
    isOpenActivity: false,
    active: true
  }];
  trackByFn(index, item) {
    return item.id;
  }
  loading = false;
  refresh() {
    this.search({});
  }
  source: LocalDataSource = new LocalDataSource();
  isOpenRescueJobActivity = false;
  rescueJobs = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 1;
  allRcStatus: any = [];
  allReasonStatus: any = [];
  allRcSubStatus: any = [];
  allReasonSubStatus: any = [];
  listRescueJobOpen = [];
  pageSizeList = 999;
  listBpPartner;
  pageIndexPartner = 1;
  pageSizePartner = 999;
  pageIndexList = 1;
  packageName;
  listUser;
  currentRescueJobOpen;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  searchByDto = {
    rescueJobId: '',
    pageIndex: 0,
    pageSize: 0
  };
  onCustomAction(event) {
    this.addNewWorkspace(event.data.rescueid);
  }
  getAllBpPartner() {
    this._call.getAllBpPartner(this.pageIndexPartner, this.pageSizePartner).subscribe(
      res => {
        this.listBpPartner = res.content;
      });

  }
  getListUsers() {
    this._call.getListUsers().subscribe(
      res => {
        this.listUser = res;
      });
  }
  getAllRcStatus(type) {
    this._call.getAllrcstatusbytype(type)
      .subscribe(
        res => this.allRcStatus = res,
        err => console.log(err)
      )
  };
  getAllReasonStatus(type) {
    this._call.getAllrcstatusbytype(type)
      .subscribe(
        res => this.allReasonStatus = res,
        err => console.log(err)
      )
  };
  getAllRcSubStatus(type) {
    this._call.getAllsubstatusbytype(type)
      .subscribe(
        res => this.allRcSubStatus = res,
        err => console.log(err)
      )
  };
  getAllReasonSubStatus(type) {
    this._call.getAllsubstatusbytype(type)
      .subscribe(
        res => this.allReasonSubStatus = res,
        err => console.log(err)
      )
  }
  search(search) {
    this.loading = true;
    this._call.getMyRescues(search, this.pageSize)
      .subscribe(
        res => {
          for (let i = 0; i < res.content.length; i++) {
            let e = res.content[i];
            var result = {
              create_date: e.createDate,
              update_date: e.updateDate,
              rescueid: e.id,
              csstatus: this.allRcStatus[e.jobStatus],
              subcsstatus: this.allRcSubStatus[e.jobStatus + '_' + e.jobSubStatus],
              priority: e.priority,
              csagentname: e.assigned != null ? e.assigned.fullname : '',
              doid: e.deliveryOrder.doId,
              docode: e.deliveryOrder.doCode,
              clientname: e.deliveryOrder.customerName,
              clientphone: e.deliveryOrder.customerPhone,
              couriername: e.deliveryOrder.lastmile.shortname,
              lastmilestatus: e.lastmileReason,
              lastmilesubstatus: e.lastmileReasonDetail,
              comment: e.jobComment,
              usernote: e.userNote,
              returnreason: this.allReasonStatus[e.jobReason]
            };
            this.rescueJobs.push(result);
          }
          this.source.load(this.rescueJobs);
          this.totalItems = res.totalElements;
          setTimeout(() => this.loading = false, 1000);
        },
        err => {
          localStorage.removeItem('token')
          window.location.href = 'auth/login';
        }
      )
  }
  settings = {    
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'viewrecord', title: 'Detail'}
      ],
      filter: false
    },
    columns: {
      create_date: {
        title: 'Create Date',
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
      update_date: {
        title: 'Update Date',
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
      rescueid: {
        title: 'Rescue Job ID',
        type: 'number'
      },
      csstatus: {
        title: 'CS Status',
        type: 'string',
      },
      subcsstatus: {
        title: 'Sub CS Status',
        type: 'string',
      },
      priority: {
        title: 'Priority',
        type: 'number',
      },
      csagentname: {
        title: 'CS Agent Name',
        type: 'string',
      },
      doid: {
        title: 'DO ID',
        type: 'number',
      },
      docode: {
        title: 'DO Code',
        type: 'string',
      },
      clientname: {
        title: 'Client Name',
        type: 'string',
      },
      clientphone: {
        title: 'Client Phone',
        type: 'number',
      },
      couriername: {
        title: 'Courier Name',
        type: 'string',
      },
      lastmilestatus: {
        title: 'Lastmile Status',
        type: 'string'
      },
      lastmilesubstatus: {
        title: 'Lastmile Sub Status',
        type: 'string'
      },
      comment: {
        title: 'Comment',
        type: 'string'
      },
      usernote: {
        title: 'User Note',
        type: 'string'
      },
      returnreason: {
        title: 'Return Reason',
        type: 'string'
      }
    },
  };
  checkRescueJobIsOpen(rescueJobId) {
    var isOpen = false;
    for (var i = 0; i < this.listRescueJobOpen.length; i++) {
      if (this.listRescueJobOpen[i].id == rescueJobId) {
        isOpen = true;
        return isOpen;
      }
    }
    return isOpen;
  }
  addNewWorkspace(rescueJobId) {
    if (this.workspaces != null && this.workspaces.length >= 0) {
      for(let i = 0; i < this.workspaces.length; i++)
      {
        if(i > 0)
        {
          this.listRescueJobOpen = [];
          this.workspaces.splice(i, 1);
        }
      }
      this.currentRescueJobOpen = {};
      if (rescueJobId != null && rescueJobId != '') {
        var tabId = "rescueJob" + rescueJobId; //this is id on tab content div where the 
        if (this.listRescueJobOpen != null && this.listRescueJobOpen.length == 0) {
          for (var i = 0; i < this.rescueJobs.length; i++) {
            if (this.rescueJobs[i].rescueid == rescueJobId) {

              this._call.checkById(rescueJobId).subscribe(
                res => {

                  if (res == "") {
                    this._func.showToast('warning', 'Notification', 'Error. Please reload the page again');
                  } else {

                    this.listRescueJobOpen.push(res);
                    this.currentRescueJobOpen = res;
                    this.currentRescueJobOpen.isEditComment = false;
                    this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = false;

                    this.searchByDto.rescueJobId = res.id;
                    this.searchByDto.pageIndex = this.pageIndexList;
                    this.searchByDto.pageSize = this.pageSizeList;

                    this._call.getListRescueHistory(this.searchByDto).subscribe(
                      res => {
                        this.currentRescueJobOpen.listRescueHistory = res.content;
                      });

                    this._call.getListSaleOrder(this.searchByDto).subscribe(
                      res => {
                        this.currentRescueJobOpen.listSaleOrder = res.content;

                        for (var j = 0; j < res.totalElements; j++) {
                          for (var i = 0; i < this.listBpPartner.length; i++) {
                            if (this.listBpPartner[i].pnId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                              this.currentRescueJobOpen.listSaleOrder[j].partner = this.listBpPartner[i].shortname;
                            }
                          }
                          for (var i = 0; i < this.listUser.length; i++) {
                            if (this.listUser[i].userId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                              this.currentRescueJobOpen.listSaleOrder[j].partner = this.listUser[i].fullname;
                            }
                          }
                        }
                      });

                    this._call.getListDeliveryOrder(this.searchByDto).subscribe(
                      res => {
                        this.currentRescueJobOpen.listDeliveryOrder = res.content;
                        this.packageName = res.content[0].packageName;
                      });
                      for(let i = 0; i < this.workspaces.length; i++)
                      {
                          this.workspaces[i].active = false;
                      }
                    this.workspaces.push({
                      id: rescueJobId,
                      name: 'RescueJob ' + rescueJobId,
                      isOpenActivity: false,
                      delete: true,
                      active: true
                    });
                    //this.workspaces = this.workspaces;

                   this.selectTab(this.currentRescueJobOpen.id);
                    // timeout(function () {
                    //    this.addNewWorkspace(rescueJobId);//fix tạm thời để show tab.
                    // });
                  }
                });

            }
          }
        }
        else {
          if (!this.checkRescueJobIsOpen(rescueJobId)) {
            if (this.workspaces.length <= 5) {
              for (var i = 0; i < this.rescueJobs.length; i++) {
                if (this.rescueJobs[i].rescueid == rescueJobId) {
                  
                  this._call.checkById(rescueJobId).subscribe(
                    res => {

                      if (res == "") {
                        this._func.showToast('warning', 'Notification', 'Error. Please reload the page again');
                      } else {

                        this.listRescueJobOpen.push(res);
                        this.currentRescueJobOpen = res;
                        this.currentRescueJobOpen.isEditComment = false;
                        this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = false;

                        this.searchByDto.rescueJobId = res.id;
                        this.searchByDto.pageIndex = this.pageIndexList;
                        this.searchByDto.pageSize = this.pageSizeList;

                        this._call.getListRescueHistory(this.searchByDto).subscribe(
                          res => {
                            this.currentRescueJobOpen.listRescueHistory = res.content;
                          });

                        this._call.getListSaleOrder(this.searchByDto).subscribe(
                          res => {
                            this.currentRescueJobOpen.listSaleOrder = res.content;

                            for (var j = 0; j < res.totalElements; j++) {
                              for (var i = 0; i < this.listBpPartner.length; i++) {
                                if (this.listBpPartner[i].pnId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                                  this.currentRescueJobOpen.listSaleOrder[j].partner = this.listBpPartner[i].shortname;
                                }
                              }
                              for (var i = 0; i < this.listUser.length; i++) {
                                if (this.listUser[i].userId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                                  this.currentRescueJobOpen.listSaleOrder[j].partner = this.listUser[i].fullname;
                                }
                              }
                            }
                          });

                        this._call.getListDeliveryOrder(this.searchByDto).subscribe(
                          res => {
                            this.currentRescueJobOpen.listDeliveryOrder = res.content;
                            this.packageName = res.content[0].packageName;
                          });
                          for(let i = 0; i < this.workspaces.length; i++)
                          {
                              this.workspaces[i].active = false;
                          }
                        this.workspaces.push({
                          id: rescueJobId,
                          name: 'RescueJob ' + rescueJobId,
                          delete: true,
                          isOpenActivity: false,
                          active: true
                        });
                        //this.workspaces = this.workspaces;
                        this.selectTab(this.currentRescueJobOpen.id);

                        // timeout(function () {
                        //     this.addNewWorkspace(rescueJobId);//fix tạm thời để show tab.
                        // });
                      }
                    });
                }
              }
            }
            else {
              this._func.showToast('warning', 'Hi There!', 'The maximum number of tabs that can be opened is 5')
              return;
            }
          }
          else {
            for (var i = 0; i < this.listRescueJobOpen.length; i++) {
              if (this.listRescueJobOpen[i].id == rescueJobId) {
                this.currentRescueJobOpen = this.listRescueJobOpen[i];

                this.selectTab(this.currentRescueJobOpen.id);
                //this.active = (i + 1);
              }
            }
          }
        }
      }
    }
  };
  back() {
    for (var i = 0; i < this.workspaces.length; i++) {
      if (this.workspaces[i].id == this.currentRescueJobOpen.id) {
        this.workspaces[i].isOpenActivity = false;
        this.isOpenRescueJobActivity = false;
      }
    }
  };
  removeTab(id, event) {
    event.preventDefault();

    //xử lý tab khi xóa đi thì xóa trong list
    for (var i = 0; i < this.workspaces.length; i++) {
      if (this.workspaces[i].id == id) {
        this.workspaces.splice(i, 1);
        if (this.listRescueJobOpen != null && this.listRescueJobOpen.length > 0) {
          for (var j = 0; j < this.listRescueJobOpen.length; j++) {
            if (this.listRescueJobOpen[j].id == id) {
              this.listRescueJobOpen.splice(j, 1);
              break;
            }
          }
        }
      }
    }
    //this.active = 0;
    this.workspaces[0].active = true;
  }
  selectTab(id) {
    this.isOpenRescueJobActivity = false;
    this.currentRescueJobOpen = {};
    for (var i = 0; i < this.workspaces.length; i++) {
      if (this.workspaces[i].id == id) {
        this.isOpenRescueJobActivity = this.workspaces[i].isOpenActivity;
        break;
      }
    }
    if (this.listRescueJobOpen.length > 0) {
      for (var j = 0; j < this.listRescueJobOpen.length; j++) {
        if (this.listRescueJobOpen[j] != null && this.listRescueJobOpen[j].id == id) {
          this.currentRescueJobOpen = this.listRescueJobOpen[j];
          break;
        }
      }
    }
  }
  selectTab1(event) {
    for (var i = 0; i < this.workspaces.length; i++) {
      if(this.workspaces[i].name != event.tabTitle)
      {
        this.workspaces[i].active = false
      }
      else
      {
        this.workspaces[i].active = true
      }
    }
  }
  saveComment() {
    this._call.checkById(this.currentRescueJobOpen.id).subscribe(
      res => {
        if (res == null || res == "") {
          this._func.showToast('warning', 'Notification', 'Error. Please reload the page again');
        } else {
          this._call.saveComment(this.currentRescueJobOpen).subscribe(
            res => {
              if (res == null || res == "") {
                this._func.showToast('warning', 'Notification', 'Rescue Job is closed. Can not add activity. Please reload the page');
              } else {
                this._func.showToast('info', 'Notification', 'Save comment success');
                this.updateCurentRescueJob();
                this.search({});
              }
            });
        }
      }, function failure() {
        this._func.showToast('danger', 'Notification', 'An error occurred.');
      });
  };
  editComment() {
    if (this.currentRescueJobOpen != null && this.currentUser != null) {
      //check quyền nếu assigned trong job khác null thì cần quyền Supervisor (gồm 3 quyền: isRoleTeamLeader, isRoleValidation, isRoleManagement) thì sẽ được quyền comment
      if (this.currentRescueJobOpen.assigned != null &&
        (this.currentUser.isRoleTeamLeader
          || this.currentUser.isRoleValidation
          || this.currentUser.isRoleManagement
          || this.currentUser.isRoleAgent
          || this.currentUser.isRoleLogistic
          || this.currentUser.userId == this.currentRescueJobOpen.assigned.userId)) {

        this.currentRescueJobOpen.jobCommentBefore = this.currentRescueJobOpen.jobComment;
        this.currentRescueJobOpen.isEditComment = true;

      }
      //check quyền nếu assigned trong job bằng null thì nếu assigned của job chính là user đang đăng nhập 
      //hoặc có quyền Supervisor(gồm 3 quyền: isRoleTeamLeader, isRoleValidation, isRoleManagement) thì sẽ được quyền comment
      else if (this.currentRescueJobOpen.assigned == null && (this.currentUser.isRoleTeamLeader || this.currentUser.isRoleValidation || this.currentUser.isRoleManagement || this.currentUser.isRoleAgent || this.currentUser.isRoleLogistic)) {
        this.currentRescueJobOpen.jobCommentBefore = this.currentRescueJobOpen.jobComment;
        this.currentRescueJobOpen.isEditComment = true;
      }
      else {
        this._func.showToast('warning', 'Notification', 'Sorry, You do not have permission edit this rescue job.');
        return;
      }
    }
  };
  closeComment() {
    if (this.currentRescueJobOpen != null) {

      this.currentRescueJobOpen.jobComment = this.currentRescueJobOpen.jobCommentBefore;
      this.currentRescueJobOpen.isEditComment = false;
    }
  };
  updateCurentRescueJob() {
    if (this.currentRescueJobOpen != null && this.currentRescueJobOpen.id != null) {

      this._call.checkById(this.currentRescueJobOpen.id).subscribe(
        res => {
          if (res == "") {
            this._func.showToast('warning', 'Notification', 'Error. Please reload the page again');
          } else {
            this.currentRescueJobOpen = {};
            for (var i = 0; i < this.listRescueJobOpen.length; i++) {
              if (this.listRescueJobOpen[i].id == res.id) {
                this.listRescueJobOpen[i] = res;

                this.currentRescueJobOpen = res;
                this.currentRescueJobOpen.isEditComment = false;
                this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = false;

                this.searchByDto.rescueJobId = res.id;
                this.searchByDto.pageIndex = this.pageIndexList;
                this.searchByDto.pageSize = this.pageSizeList;

                this._call.getListRescueHistory(this.searchByDto).subscribe(
                  res => {
                    this.currentRescueJobOpen.listRescueHistory = res.content;
                  });

                this._call.getListSaleOrder(this.searchByDto).subscribe(
                  res => {
                    this.currentRescueJobOpen.listSaleOrder = res.content;

                    for (var j = 0; j < res.totalElements; j++) {
                      for (var i = 0; i < this.listBpPartner.length; i++) {
                        if (this.listBpPartner[i].pnId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                          this.currentRescueJobOpen.listSaleOrder[j].partner = this.listBpPartner[i].shortname;
                        }
                      }
                      for (var i = 0; i < this.listUser.length; i++) {
                        if (this.listUser[i].userId == this.currentRescueJobOpen.listSaleOrder[j].lead.agcId) {
                          this.currentRescueJobOpen.listSaleOrder[j].partner = this.listUser[i].fullname;
                        }
                      }
                    }
                  });

                this._call.getListDeliveryOrder(this.searchByDto).subscribe(
                  res => {
                    this.currentRescueJobOpen.listDeliveryOrder = res.content;
                    this.packageName = res.content[0].packageName;
                  });

                break;
              }
            }
          }
        });

    }
  };
  newActivity() {
    if (this.workspaces != null && this.currentRescueJobOpen != null) {
      for (var i = 0; i < this.workspaces.length; i++) {
        if (this.workspaces[i].id == this.currentRescueJobOpen.id) {
          this.workspaces[i].isOpenActivity = false;
          this._call.checkById(this.currentRescueJobOpen.id).subscribe(
            res => {
              if (res != null && res.id != null) {
                if (this.currentRescueJobOpen.curentActive == null) {
                  this.isOpenRescueJobActivity = true;
                  this.workspaces[i].isOpenActivity = true;

                  if (this.currentRescueJobOpen.jobStatus != null) {
                    this._call.getCsStatusByRescueJobStatus(this.currentRescueJobOpen.jobStatus).subscribe(
                      res => {
                        this.currentRescueJobOpen.csStatusActivity = res;
                      });
                  }

                  this.currentRescueJobOpen.curentActive = {};
                  this.currentRescueJobOpen.curentActive.isEditClientName = false;
                  this.currentRescueJobOpen.curentActive.isEditPhoneNumber = false;
                  this.currentRescueJobOpen.curentActive.rescueJob = res;
                  this.currentRescueJobOpen.curentActive.activityType = 4;
                  if (res.deliveryOrder != null) {
                    this.currentRescueJobOpen.curentActive.contactName = res.deliveryOrder.customerName;
                    this.currentRescueJobOpen.curentActive.contactPhone = res.deliveryOrder.customerPhone;
                  }
                } else {
                  this.isOpenRescueJobActivity = true;
                  this.workspaces[i].isOpenActivity = true;
                }
              } else {
                this.isOpenRescueJobActivity = false;
                this._func.showToast('warning', 'Notification', 'Error. Please reload the page');
              }
            });
          return;
        }
      }
    }
  };
  saveCurentActivity(dialog) {
    if (this.currentRescueJobOpen == null || this.currentRescueJobOpen.curentActive == null) {
      this._func.showToast('warning', 'Notification', 'An error occurred, please reload the page.');
      return;
    }
    this.currentRescueJobOpen.curentActive.activeTime = moment(this.date).format('YYYY-MM-DDTHH:mm:ss.sss');
    if (this.currentRescueJobOpen.curentActive.isEditClientName == true) {
      this._func.showToast('warning', 'Notification', 'Please save changes "Client Name" before saving.');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.isEditPhoneNumber == true) {
      this._func.showToast('warning', 'Notification', 'Please save changes "Phone number"  before saving.');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.contactName == null || this.currentRescueJobOpen.curentActive.contactName == '') {
      this._func.showToast('warning', 'Notification', 'Please enter "Client Name".');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.contactPhone == null || this.currentRescueJobOpen.curentActive.contactPhone == '') {
      this._func.showToast('warning', 'Notification', 'Please enter "Phone number".');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.activityType == null || this.currentRescueJobOpen.curentActive.activityType == '') {
      this._func.showToast('warning', 'Notification', 'Please choose "Activity type".');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.newStatus == null || this.currentRescueJobOpen.curentActive.newStatus == null || this.currentRescueJobOpen.curentActive.newStatus == '') {
      this._func.showToast('warning', 'Notification', 'Please choose "CS status".');
      return;
    }
    if (this.currentRescueJobOpen.curentActive.newSubStatus == null || this.currentRescueJobOpen.curentActive.newSubStatus == null || this.currentRescueJobOpen.curentActive.newSubStatus == '') {
      this._func.showToast('warning', 'Notification', 'Please choose "Sub-CS status".');
      return;
    }

    this._call.saveRescueJobActivity(this.currentRescueJobOpen.curentActive).subscribe(
      res => {
        if (res != null) {
          if (res.result != null && res.caseResult == 0) {
            this.open2(dialog);
          }
          else {
            this._func.showToast('warning', 'Notification', res.textResult)
          }
        } else {
          this._func.showToast('warning', 'Notification', 'An error occurred, please try again.');
        }
      });
  };
  open2(dialog) {
    this.windowService.open(
      dialog,
      {
        title: 'Success!',
      },
    );
  }
  OkSave() {
    this._func.showToast('info', 'Notification', 'You have successfully saved.');
    this.back();
    this.search({});
    this.updateCurentRescueJob();
  }
  activityTypes = [
    { id: 1, name: 'Call' },
    { id: 2, name: 'Partner Update,' },
    { id: 4, name: 'Manual update' }
  ];
  editClientName() {
    if (this.currentRescueJobOpen != null && this.currentRescueJobOpen.deliveryOrder != null && this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.contactNameBefore = this.currentRescueJobOpen.curentActive.contactName;
      this.currentRescueJobOpen.curentActive.isEditClientName = true;
    }
  };

  saveClientName() {
    this.currentRescueJobOpen.curentActive.isEditClientName = false;
  };

  closeClientName() {
    if (this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.contactName = this.currentRescueJobOpen.curentActive.contactNameBefore;
      this.currentRescueJobOpen.curentActive.isEditClientName = false;
    }
  };

  editPhoneNumber() {
    if (this.currentRescueJobOpen != null && this.currentRescueJobOpen.deliveryOrder != null && this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.phoneNumberBefore = this.currentRescueJobOpen.curentActive.contactPhone;
      this.currentRescueJobOpen.curentActive.isEditPhoneNumber = true;
    }
  };

  savePhoneNumber() {
    this.currentRescueJobOpen.curentActive.isEditPhoneNumber = false;
  };

  closePhoneNumber() {
    if (this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.contactPhone = this.currentRescueJobOpen.curentActive.phoneNumberBefore;
      this.currentRescueJobOpen.curentActive.isEditPhoneNumber = false;
    }
  };
  coppyPhone() {
    this._func.showToast('success', 'Notification', 'Coppy Phone number success')
  }
  channel;
  isCalling = false;
  call() {
    this.channel = "";
    if (this.currentRescueJobOpen != null && this.currentRescueJobOpen.curentActive != null && this.currentUser != null && this.currentUser.userId != null) {
      this.currentRescueJobOpen.curentActive.activityType = 1;
      this._call.call({
        fromNumber: this.currentUser.phone,
        toNumber: "9" + this.currentRescueJobOpen.curentActive.contactPhone
      })
        .subscribe(
          res => {
            this.isCalling = true;
            this.channel = res;
            this._func.showToast('info', 'Notification', 'Dial success.')
          },
          err => this._func.showToast('danger', 'Error', 'Dial fail. An error occurred.')
        )
    }
  };
  endCall() {
    this.isCalling = false;
    this._call.uncall({ channel: this.channel })
      .subscribe(
        res => {
          this.channel = "";
          this._func.showToast('info', 'Notification', 'Close success.')
        },
        err => this._func.showToast('danger', 'Error', 'Close fail. An error occurred.')
      )
  };
  listLastmileStatus;
  searchPriorityDto;
  getLastmileStatus() {
    this._call.getLastMileStatus()
      .subscribe(
        res => {
          this.listLastmileStatus = res
        },
        err => console.log(err)
      )
  }
  listLastmileSubStatus;
  getLastmileSubStatus() {
    this.searchPriorityDto = {};
    this.currentRescueJobOpen.priority = 0;
    this.currentRescueJobOpen.lastmileReasonDetail = '';
    if (this.currentRescueJobOpen.lastmileReason != null && this.currentRescueJobOpen.lastmileReason != '') {
      this.searchPriorityDto.statusName = this.currentRescueJobOpen.lastmileReason;

      this._call.getPiorityByStatusName(this.searchPriorityDto).subscribe(
        res => {
          this.currentRescueJobOpen.priority = res;

          this._call.getLastmileSubStatus(this.currentRescueJobOpen.lastmileReason).subscribe(
            res => {
              this.listLastmileSubStatus = res;
              if (this.listLastmileSubStatus != null && this.listLastmileSubStatus.length > 0) {
                this.currentRescueJobOpen.lastmileReasonDetail = this.listLastmileSubStatus[0];
              }
            });
        });
    }
  }
  csSubStatusActivity;
  changeCsStatusActivity() {
    if (this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.newSubStatus = null;
    }
    if (this.currentRescueJobOpen.curentActive != null && this.currentRescueJobOpen.curentActive.newStatus != null) {
      this._call.getCssubstatusbystatusid(this.currentRescueJobOpen.curentActive.newStatus).subscribe(
        res => {
          this.csSubStatusActivity = res;
        });
    }
  };
  returnedReasonsActivity;
  getReturnedReasons(type) {
    this._call.getCsStatusbyType(type).subscribe(
      res => {
        this.returnedReasonsActivity = res;
      });
  }
  subReturnedReasonsActivity;
  changeReturnedReasonsActivity() {
    if (this.currentRescueJobOpen.curentActive != null) {
      this.currentRescueJobOpen.curentActive.newSubReason = null;
    }
    if (this.currentRescueJobOpen.curentActive != null && this.currentRescueJobOpen.curentActive.newReason != null) {
      this._call.getCssubstatusbystatusid(this.currentRescueJobOpen.curentActive.newReason).subscribe(
        res => {
          this.subReturnedReasonsActivity = res;
        });
    }
  };
}