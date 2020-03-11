import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-tab2',
  template: `
    <p>Tab 2 works!</p>
  `,
})
export class Tab2Component { }
@Component({
    selector: 'ngx-allrescues',
    templateUrl: './allrescues.component.html',
    styleUrls: ['./allrescues.component.scss'],
  })
export class AllRescuesComponent implements OnInit {
    constructor() {
        
    }
    ngOnInit(): void {
    }
    tabs: any[] = [
      {
        title: 'All Rescue Job',
        route: '/pages/rescuejob/allrescues/tab1',
      },      
    ];
}