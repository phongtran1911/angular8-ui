import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { LeadComponent } from './lead/lead.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { RescuePerformanceComponent } from './rescueperformance/performance.component';
import { MarketingSummaryComponent } from './marketingsummary/marketingsummary.component';
import { CampaignCreatedComponent } from './campaigncreated/campaigncreated.component';
import { CampaignUpdatedComponent } from './campaignupdated/campaignupdated.component';


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
    },
    {
      path: 'rescueperformance',
      component: RescuePerformanceComponent
    },
    {
      path: 'marketingsummary',
      component: MarketingSummaryComponent
    },
    {
      path: 'campaigncreated',
      component: CampaignCreatedComponent
    },
    {
      path: 'campaignupdated',
      component: CampaignUpdatedComponent
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
  DeliveryComponent,
  RescuePerformanceComponent,
  MarketingSummaryComponent,
  CampaignCreatedComponent,
  CampaignUpdatedComponent
];
