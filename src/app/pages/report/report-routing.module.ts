import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { LeadComponent } from './lead/lead.component';
import { DeliveryComponent } from './delivery/delivery.component';


const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: 'lead',
      component: LeadComponent,
    },
    {
      path: 'delivery',
      component: DeliveryComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule { }

export const routedComponents = [
  ReportComponent,
  LeadComponent,
  DeliveryComponent
];
