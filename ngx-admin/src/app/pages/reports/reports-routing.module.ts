import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartiesComponent } from './parties/parties.component';
import { TablestationsComponent } from './tablestations/tablestations.component';

const routes: Routes = [
  {
    path: 'cursos',
    component: CandidatesComponent,
  },
  {
    path: 'estudiantes',
    component: TablestationsComponent,
  },
  {
    path: 'departamentos',
    component: PartiesComponent,
  },
  {
    path: 'general',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
