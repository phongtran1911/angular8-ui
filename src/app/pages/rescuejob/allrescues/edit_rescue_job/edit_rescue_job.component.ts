import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditRescueJobService } from '../../../../@core/Services/RescueJob/editrescuejob.service';
import { LocalDataSource } from 'ng2-smart-table';
import { FunctionAllService } from '../../../../@core/utils/index';
@Component({
    selector: 'ngx-editrescuejob',
    styleUrls: ['./edit_rescue_job.component.scss'],
    templateUrl: './edit_rescue_job.component.html',
  })
export class EditRescueJobComponent implements OnInit {
    constructor(private _router: Router,
        private _func: FunctionAllService,
        private _call: EditRescueJobService){

    }
    source: LocalDataSource = new LocalDataSource();
    ngOnInit(): void {
        this.getLastmileStatus();
        this.newRescueJob();
    }
    settings = {           
        actions: {
          add: false,
          edit: false,
          delete: false
        },
        columns: {          
          name: {
            title: 'Product',
            type: 'string',
            filter: false, 
          },
          price: {
            title: 'Price',
            type: 'number',
            filter: false, 
          },
          quantity: {
            title: 'Quantity',
            type: 'number',
            filter: false, 
          },
          amount: {
            title: 'Cost',
            type: 'number',
            filter: false, 
          },          
        },
      };
    rescueJob = {
        deliveryOrder: {
            fulfilment: {},
            lastmile: {},
            statusShowView: {},
            doId: ''
        },
        priority: 0,
        lastmileReasonDetail: '',
        lastmileReason: '',
        id: '',
        ffmReason: '',
        ffmReasonDetail: ''
    };
    listOdSaleOrderItem;
    Back() {
        this._router.navigate(['/pages/rescuejob/allrescues']);
    }
    listLastmileStatus;
    list
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
        this.rescueJob.priority = 0;
        this.rescueJob.lastmileReasonDetail = '';
        this.listLastmileSubStatus = [];
        if (this.rescueJob.lastmileReason != null && this.rescueJob.lastmileReason != '') {
            this.searchPriorityDto.statusName = this.rescueJob.lastmileReason;

            this._call.getPiorityByStatusName(this.searchPriorityDto)
                .subscribe(
                    res => {
                        this.rescueJob.priority = Number.parseInt(res.toString());
                        this._call.getLastmileSubStatus(this.rescueJob.lastmileReason)
                            .subscribe(
                                res => {
                                    this.listLastmileSubStatus = res;
                                    if (this.listLastmileSubStatus != null && this.listLastmileSubStatus.length > 0) {
                                        this.rescueJob.lastmileReasonDetail = this.listLastmileSubStatus[0];
                                    }
                                },
                                err => console.log(err)
                            )
                    },
                    err => console.log(err)
                )
        }
    }
    prioritys;
    getAllPriority() {
        this._call.getAllPriority()
            .subscribe(
                res => {
                    var lst = [];
                    lst = Object.entries(res);
                    for(let i = 0; i < lst.length; i++)
                    {
                        this.prioritys.push({ id: lst[i], name: lst[i] });
                    }
                },
                err => console.log(err)
            )
    }
    newRescueJob() {
        this.listOdSaleOrderItem = [];
        this._call.getNewRescueJobID()
            .subscribe(
                res => this.rescueJob.id = res.toString(),
                err => console.log(err)
            )
    }
    checkCreateRescueJobByDO(searchDto) {
        this._call.checkCreateRescueJobByDO(searchDto)
            .subscribe(
                res => {
                    if(res != null)
                    {
                        if(res.caseResult == 0 && res.doResult != null)
                        {
                            this.rescueJob.deliveryOrder = res.doResult;
                            this.rescueJob.ffmReason = res.ffmReason;
                            this.rescueJob.ffmReasonDetail = res.ffmReasonDetail;
                            this.rescueJob.lastmileReason = res.lastmileReason;
                            this.rescueJob.lastmileReasonDetail = res.lastmileReasonDetail;

                            if (this.rescueJob.deliveryOrder != null && this.rescueJob.deliveryOrder.odSaleOrder != null && this.rescueJob.deliveryOrder.odSaleOrder.soId != null) {
                                this.listOdSaleOrderItem = [];
                                this._call.getByOdSaleOrderId(this.rescueJob.deliveryOrder.odSaleOrder.soId)
                                    .subscribe(
                                        res => this.listOdSaleOrderItem = res,
                                        err => console.log(err)
                                    )
                            }
                        }
                        else
                        {
                            this._func.showToast('warning', 'Hi There!',res.textResult);
                            return;
                        }
                    }
                },
                err => console.log(err)
            )

    }
    findDataByDoId() {
        var searchDto = {doId:''};
        searchDto.doId = this.rescueJob.deliveryOrder.doId
        this.checkCreateRescueJobByDO(searchDto);
    };
    findDataByDoCode () {
        var searchDto = {doCode:''};
        searchDto.doCode = this.rescueJob.deliveryOrder.doCode
        this.checkCreateRescueJobByDO(searchDto);
    };
    save() {
        var searchDto = {doId: '', doCode: ''};
        searchDto.doId = this.rescueJob.deliveryOrder.doId;
        searchDto.doCode = this.rescueJob.deliveryOrder.doCode;
        if (this.rescueJob.deliveryOrder == null || this.rescueJob.deliveryOrder.doId == null || this.rescueJob.deliveryOrder.doId == '') {
            this._func.showToast('warning', 'Hi there!', 'Delivery Order not found. Please try again');
            return;
        }
        if (this.rescueJob.priority < 0 ) {
            this._func.showToast('warning', 'Hi there!', 'Please select "Priority"');
            return;
        }
        if (this.rescueJob.lastmileReason == null || this.rescueJob.lastmileReason == '') {
            this._func.showToast('warning', 'Hi there!', 'Please select "Lastmile status"');
            return;
        }
        if (this.rescueJob.lastmileReasonDetail == null || this.rescueJob.lastmileReasonDetail == '') {
            this._func.showToast('warning', 'Hi there!', 'Please select "Lastmile sub status"');
            return;
        }

        this._call.findOneOdDoNewDataBySearchDto(searchDto)
            .subscribe(
                res => {
                    if(res != "")
                    {
                        this._call.saveOrUpdate(this.rescueJob)
                            .subscribe(
                                res => {
                                    if (res != null && res != "") {
                                        // Notify                
                                        this._func.showToast('success', 'Hi There!', 'Info')    
                                        // clear object
                                        window.location.href = '/pages/rescuejob/allrescues/tab1';
                                    }
                                    else {
                                        this._func.showToast('danger', 'Hi There!', 'Can not add new Rescue Job') 
                                    }
                                },
                                err => this._func.showToast('danger', 'Hi There!', 'Can not add new Rescue Job')
                            )
                    }
                    else
                    {
                        this._func.showToast('danger', 'Hi There!', 'Can not add new Rescue Job')
                    }
                },
                err => this._func.showToast('danger', 'Hi There!', 'Can not add new Rescue Job')
            )
    }
}