import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDashboardRoutingModule } from './issue-dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialSharedModule } from '../material/material-shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    IssueDashboardRoutingModule,
    SharedModule,
    MaterialSharedModule

  ]
})
export class IssueDashboardModule { }
