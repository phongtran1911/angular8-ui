import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescueJobComponent } from './rescuejob.component';
import { AllRescuesComponent } from './allrescues/allrescues.component';
import { MyRescueComponent } from './myrescue/myrescue.component';
import { EditRescueJobComponent } from './allrescues/edit_rescue_job/edit_rescue_job.component';
import { RescueJobActivityComponent } from './allrescues/rescueJob_activity/rescueJobactivity.component';


const routes: Routes = [{
  path: '',
  component: RescueJobComponent,
  children: [
    {
      path: 'allrescues',
      component: AllRescuesComponent
    },
    {
      path: 'allrescues/validator/:param1',
      component: AllRescuesComponent
    },
    {
      path: 'allrescues/sale/:param1',
      component: AllRescuesComponent
    },
    {
      path: 'allrescues/logistic/:param1',
      component: AllRescuesComponent
    },
    {
      path: 'myrescue',
      component: MyRescueComponent
    },
    {
      path: 'editrescuejob',
      component: EditRescueJobComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RescueJobRoutingModule { }

export const routedComponents = [
  RescueJobComponent,
  AllRescuesComponent,
  MyRescueComponent,
  EditRescueJobComponent,
  RescueJobActivityComponent,
];
