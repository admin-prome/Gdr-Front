import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpPanelComponent } from './help-panel/help-panel.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialSharedModule } from '../material/material-shared.module';


@NgModule({
  declarations: [
    HelpPanelComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule,
    MaterialSharedModule
    
  ]
})
export class HelpModule { }
