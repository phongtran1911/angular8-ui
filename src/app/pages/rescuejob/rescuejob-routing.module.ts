import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescueJobComponent } from './rescuejob.component';
import { AllRescuesComponent, Tab2Component } from './allrescues/allrescues.component';
import { ValidatorComponent } from './validator/validator.component';
import { SalesAgentComponent } from './salesagent/salesagent.component';
import { LogisticComponent } from './logistic/logistic.component';
import { MyRescueComponent } from './myrescue/myrescue.component';
import { Tab1Component } from './allrescues/tabcomponent/tab1.component';
import { EditRescueJobComponent } from './allrescues/edit_rescue_job/edit_rescue_job.component';


const routes: Routes = [{
  path: '',
  component: RescueJobComponent,
  children: [
    {
      path: 'allrescues',
      component: AllRescuesComponent,
      children: [
        {
          path: '',
          redirectTo: 'tab1',
          pathMatch: 'full',
        },
        {
          path: 'tab1',
          component: Tab1Component,
        },
        {
          path: 'tab2',
          component: Tab2Component,
        }
      ]
    },
    {
      path: 'validator',
      component: ValidatorComponent
    },
    {
      path: 'salesagent',
      component: SalesAgentComponent
    },
    {
      path: 'logistic',
      component: LogisticComponent
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
  ValidatorComponent,
  SalesAgentComponent,
  LogisticComponent,
  MyRescueComponent,
  Tab1Component,
  Tab2Component,
  EditRescueJobComponent
];
