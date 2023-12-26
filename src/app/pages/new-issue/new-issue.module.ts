import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { RouterModule } from '@angular/router';
import { NewIssueRoutingModule } from './new-issue-routing.module';

@NgModule({
  declarations: [
    NewIssueComponent
  ],
  imports: [
    CommonModule,  
    NewIssueRoutingModule
  ]

})
export class NewIssueModule {
  constructor() {
  }
}

