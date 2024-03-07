import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialSharedModule } from '../material/material-shared.module';
import { DialogComponent } from './pages/dialog/dialog.component';
import { MaterialSelectComponent } from 'src/app/components/material/material-select/material-select.component';


@NgModule({
  declarations: [
    HomeComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialSharedModule    
  ]
})
export class HomeModule { }
