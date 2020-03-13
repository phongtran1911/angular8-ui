import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AllRescuesService } from '../../../@core/Services/RescueJob/allrescues.service';
import { FunctionAllService } from '../../../@core/utils';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { RescueJobActivityComponent } from './rescueJob_activity/rescueJobactivity.component';

@Component({
  selector: 'ngx-allrescues',
  templateUrl: './allrescues.component.html',
  styleUrls: ['./allrescues.component.scss'],
})
export class AllRescuesComponent implements OnInit {
  constructor(public _call: AllRescuesService,
    public windowService: NbWindowService,
    public _func: FunctionAllService,
    public cookies: CookieService,
    public _router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService ) {
  }
  pageIndex = 1;
  pageSize = 10;
  pageIndexList = 1;
  totalItems;
  workspaces = [{
    id: 0,
    name: 'All Rescue Job',
    delete: false,
    isOpenActivity: false,
    active: true
  }];
  param;
  searchObject = { key: 0 };
  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param1');
    if (this.param != null) {
      this.searchObject.key = this.param;
      this.search(this.searchObject)
    }
    else {
      this.search({})
    }
    this.getAllRcStatus(this.rcStatusType.rescueJob)
    this.getAllRcSubStatus(this.rcStatusType.rescueJob)
    this.getAllReasonStatus(this.rcStatusType.reason)
    this.getAllReasonSubStatus(this.rcStatusType.reason)
    this.getAllBpPartner()
    this.getListUsers()
  }
  trackByFn(index, item) {
    return item.id;
  }
  isOpenRescueJobActivity = false;
  listRescueJobOpen = [];
  allRcStatus: any = [];
  allReasonStatus: any = [];
  allRcSubStatus: any = [];
  allReasonSubStatus: any = [];
  rcStatusType = { rescueJob: 1, reason: 2 };
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
          console.log(this.currentRescueJobOpen);
          break;
        }
      }
    }
  }
  searchByDto = {
    rescueJobId: '',
    pageIndex: 0,
    pageSize: 0
  };
  pageSizeList = 999;
  listBpPartner;
  pageIndexPartner = 1;
  pageSizePartner = 999;
  packageName;
  listUser;
  getAllBpPartner() {
    this._call.getAllBpPartner(this.pageIndexPartner, this.pageSizePartner).subscribe(
      res => {
        this.listBpPartner = res.content;
      });

  }
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
  getListUsers() {
    this._call.getListUsers().subscribe(
      res => {
        this.listUser = res;
      });
  }
  addNewWorkspace(rescueJobId) {
    if (this.workspaces != null && this.workspaces.length >= 0) {
      this.currentRescueJobOpen = {};
      if (rescueJobId != null && rescueJobId != '') {
        var tabId = "rescueJob" + rescueJobId; //this is id on tab content div where the 
        if (this.listRescueJobOpen != null && this.listRescueJobOpen.length == 0) {
          for (var i = 0; i < this.rescueJobs.length; i++) {
            if (this.rescueJobs[i].id == rescueJobId) {

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

                    this.workspaces.push({
                      id: rescueJobId,
                      name: 'RescueJob ' + rescueJobId,
                      isOpenActivity: false,
                      delete: true,
                      active: true
                    });
                    this.workspaces = this.workspaces;

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
                if (this.rescueJobs[i].id == rescueJobId) {
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

                        this.workspaces.push({
                          id: rescueJobId,
                          name: 'RescueJob ' + rescueJobId,
                          delete: true,
                          isOpenActivity: false,
                          active: true
                        });
                        this.workspaces = this.workspaces;
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
  currentRescueJobOpen;
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
  }
  loading = false;
  rescueJobs;
  selectedRescue = [];
  userAssign;
  goEditRescue() {
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
    for (let i = 0; i < this.selectedRescue.length; i++) {
      this.selectedRescue[i].userNote = "Agent is assigned";
    }
    this._call.saveRescueUser(this.selectedRescue, this.userAssign.userId)
      .subscribe(
        res => {
          this._func.showToast('success', 'Hi There!', 'Assign ' + this.selectedRescue.length + ' record.');
          location.reload();
        },
        err => this._func.showToast('danger', 'Hi there!', 'Assign rescues error.')
      )
  }
  Released() {
    for (var i = 0; i < this.selectedRescue.length; i++) {
      this.selectedRescue[i].userNote = "Teamlead is released";
    }
    this._call.saveRescueUser(this.selectedRescue, 0)
      .subscribe(
        res => {
          if (res == null || res == "") {
            this._func.showToast('warning', 'Hi there!', 'Sorry, You do not release this rescue job. Please reloads the page');
          } else {
            // Notify
            this._func.showToast('info', 'Hi There!', 'Release ' + this.selectedRescue.length + ' record.');
            this.refresh();
          }
        },
        err => this._func.showToast('danger', 'Hi there!', 'Release rescues error.')
      )
  }
  Taked() {
    for (var i = 0; i < this.selectedRescue.length; i++) {
      this.selectedRescue[i].userNote = "Takes a Rescue Job";
    }
    this._call.saveRescueUser(this.selectedRescue, localStorage.getItem('userId'))
      .subscribe(
        res => {
          if (res == null || res == "") {
            this._func.showToast('danger', 'Hi there!', 'This rescue job has been assigned to others or rescue job is closed.');
          } else {
            // Notify
            this._func.showToast('info', 'Hi There!', 'Take ' + res + ' record.');
            this.refresh();
          }
        },
        err => this._func.showToast('danger', 'Hi there!', 'Take rescues error.')
      )
  }
  refresh() {
    this.search();
  }
  pageChange() {
    this.search();
  }
  search(search) {
    this.loading = true;
    this.listSelected = [];
    this.selectedCheckbox = {};
    this.isCheckAll = false;
    this._call.getRescues(search)
      .subscribe(
        res => {
          this.rescueJobs = res.content;
          this.totalItems = res.totalElements;
          setTimeout(() => this.loading = false, 1000);
        },
        err => {
          localStorage.removeItem('token')
          window.location.href = 'auth/login';
        }
      )
  }
  currentUser = JSON.parse(this.cookies.get('currentUser'));

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
    this._call.getUserByFullName({ listRescue: [], csAgentName: "" })
      .subscribe(
        res => this.sourceUser.load(res.content),
        err => console.log(err)
      )
  }
  openWindowRelease(release) {
    var fail = 0;
    for (var i = 0; i < this.selectedRescue.length; i++) {
      if (this.selectedRescue[i].jobStatus == 7 || this.selectedRescue[i].assigned == null) { //check neu rescue job status close thi khong release
        fail++;
        this._func.showToast('warning', 'Hi there!', 'Rescue Job can not be released.');
        break;
      }
    }
    if (fail == 0) {
      this.windowService.open(
        release,
        {
          title: 'Notification',
        },
      );
    }
  }
  sourceUser: LocalDataSource = new LocalDataSource();
  listSelected = [];
  isCheckAll = true;
  selectedCheckbox = {};
  selectAll() {
    for (var i = 0; i < this.rescueJobs.length; i++) {
      var isInCheckList = false;
      for (var j = 0; j < this.listSelected.length; j++) {
        if (this.listSelected[j].id == this.rescueJobs[i].id) {
          isInCheckList = true;
          if (!this.isCheckAll) {
            this.listSelected.splice(j, 1);
            this.selectedCheckbox[this.rescueJobs[i].id] = false;
          }
          break;
        }
      }
      if (!isInCheckList && this.isCheckAll) {
        this.selectedCheckbox[this.rescueJobs[i].id] = true;
        this.listSelected.push(this.rescueJobs[i]);
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
  }
  editLastmileStatus() {
    if (this.currentRescueJobOpen != null && this.currentUser != null) {
      //check quyền nếu assigned trong job khác null thì cần quyền Supervisor (gồm 3 quyền: isRoleTeamLeader, isRoleValidation, isRoleManagement) thì sẽ được quyền comment
      if (this.currentRescueJobOpen.assigned != null &&
        (this.currentUser.isRoleTeamLeader || this.currentUser.isRoleValidation || this.currentUser.isRoleManagement || this.currentUser.isRoleAgent || this.currentUser.isRoleLogistic
          || this.currentUser.userId == this.currentRescueJobOpen.assigned.userId)) {

        this.currentRescueJobOpen.lastmileReasonBefore = this.currentRescueJobOpen.lastmileReason;
        this.currentRescueJobOpen.lastmileReasonDetailBefore = this.currentRescueJobOpen.lastmileReasonDetail;
        this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = true;

      }
      //check quyền nếu assigned trong job bằng null thì nếu assigned của job chính là user đang đăng nhập 
      //hoặc có quyền Supervisor(gồm 3 quyền: isRoleTeamLeader, isRoleValidation, isRoleManagement) thì sẽ được quyền comment
      else if (this.currentRescueJobOpen.assigned == null && (this.currentUser.isRoleTeamLeader || this.currentUser.isRoleValidation || this.currentUser.isRoleManagement || this.currentUser.isRoleAgent || this.currentUser.isRoleLogistic)) {

        this.currentRescueJobOpen.lastmileReasonBefore = this.currentRescueJobOpen.lastmileReason;
        this.currentRescueJobOpen.lastmileReasonDetailBefore = this.currentRescueJobOpen.lastmileReasonDetail;
        this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = true;
      }
      else {
        this._func.showToast('warning', 'Notification', 'Sorry, You do not have permission edit this rescue job.')
        return;
      }
    }
  };
  closeLastmileStatus() {
    if (this.currentRescueJobOpen != null) {

      this.currentRescueJobOpen.lastmileReasonDetail = this.currentRescueJobOpen.lastmileReasonDetailBefore;
      this.currentRescueJobOpen.lastmileReason = this.currentRescueJobOpen.lastmileReasonBefore;
      this.currentRescueJobOpen.isEditLastmileStatusAndLastmileSubStatus = false;
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
  saveLastmileStatus() {
    if (this.currentRescueJobOpen.lastmileReason == null || this.currentRescueJobOpen.lastmileReasonDetail == null) {
      this._func.showToast('warning', 'Notification', 'Please Selecte Lastmile status and Lastmile sub status.');
    } else {
      this._call.checkById(this.currentRescueJobOpen.id).subscribe(
        res => {
          if (res == null || res == "") {
            this._func.showToast('warning', 'Notification', 'Error. Please reload the page again');
          } else {
            this._call.updateLastmileStatusAndLastmileSubStatus(this.currentRescueJobOpen)
              .subscribe(
                res => {
                  if (res == null || res == "") {
                    this._func.showToast('warning', 'Notification', 'Rescue Job is closed. Can not update. Please reload the page');
                  } else {
                    this._func.showToast('success', 'Notification', 'Update success');
                    this.updateCurentRescueJob();
                    this.search(this.searchObject);
                  }
                });
          }
        }, err => {
          this._func.showToast('danger', 'Notification', 'An error occurred.');
        });
    }
  };
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
                this.searchRescueJobs();
              }
            });
        }
      }, function failure() {
        this._func.showToast('danger', 'Notification', 'An error occurred.');
      });
  };
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
            open(dialog);
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
    this.search(this.searchObject);
    this.updateCurentRescueJob();
  }
  removeTab = function (id, event) {
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
    this.active = 0;
  }
  addList = function (data) {
    var isCheckAllCheckbox = true;
    for (var i = 0; i < this.rescueJobs.length; i++) {
      if (!this.selectedCheckbox[this.rescueJobs[i].id] || this.selectedCheckbox[this.rescueJobs[i].id] == undefined) {
        isCheckAllCheckbox = false;
      }
    }
    if (isCheckAllCheckbox) {
      this.isCheckAll = true;
    } else {
      this.isCheckAll = false;
    }
    for (var i = 0; i < this.listSelected.length; i++) {
      if (this.listSelected[i].id == data.id) {
        this.listSelected.splice(i, 1);
        return;
      }
    }
    this.listSelected.push(data);

  }
  viewDetail(id) {
    this.dialogService.open(RescueJobActivityComponent);
  }
}