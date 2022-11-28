import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { TablestationsComponent } from './tablestations/tablestations.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { PartiesComponent } from './parties/parties.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    TablestationsComponent,
    CandidatesComponent,
    PartiesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
