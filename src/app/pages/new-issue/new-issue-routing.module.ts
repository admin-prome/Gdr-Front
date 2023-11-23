import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewIssueComponent } from './new-issue/new-issue.component';


const routes: Routes = [
  { 
    path: '', 
    children: [
        {path: 'incidencia', component: NewIssueComponent},
     
        {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
 
  imports: [
    RouterModule.forChild( routes )
    ]
 })

export class NewIssueRoutingModule {
  constructor() {
    console.log('NewIssueRoutingModule loaded.');  // Agrega este console.log
  }
}
