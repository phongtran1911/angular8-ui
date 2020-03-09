import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ReportRoutingModule, routedComponents } from './report-routing.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FsIconComponent } from './marketingsummary/marketingsummary.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    ReportRoutingModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbActionsModule,
    NbSelectModule,
    ngFormsModule,
    CommonModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
})
export class ReportModule { }
