import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { IssueCreatedComponent } from './components/issue-created/issue-created.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent , children:[
    {path: 'issueCreated', component: IssueCreatedComponent},
    {path: '', component: IssueCreateFormComponent}
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
