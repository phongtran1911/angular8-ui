import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'ngx-myrescue',
    templateUrl: './myrescue.component.html',
    styleUrls: ['./myrescue.component.scss'],
  })
export class MyRescueComponent implements OnInit {
    constructor() {
        
    }
    ngOnInit(): void {
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
}