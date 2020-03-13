import { NgModule } from '@angular/core';
import { NbActionsModule,
   NbCardModule, 
   NbIconModule, 
   NbInputModule, 
   NbTreeGridModule, 
   NbDatepickerModule, 
   NbSelectModule,
   NbTabsetModule,
   NbRouteTabsetModule,
   NbSpinnerModule,
   NbButtonModule,
   NbAccordionModule,
   NbDialogModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RescueJobRoutingModule, routedComponents } from './rescuejob-routing.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClickIDComponent } from './allrescues/tabcomponent/clickID.component';
import { RescueJobActivityComponent } from './allrescues/rescueJob_activity/rescueJobactivity.component';

@NgModule({
  imports: [    
    NbSpinnerModule,
    NbDialogModule.forChild(),
    NbAccordionModule,
    NbCardModule,
    NbTreeGridModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    RescueJobRoutingModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbActionsModule,
    NbSelectModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    ngFormsModule,
    CommonModule,  
  ],
  entryComponents: [
    RescueJobActivityComponent,   
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class RescueJobModule { }
