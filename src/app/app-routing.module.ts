import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { IssueCreatedComponent } from './components/issue-created/issue-created.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';
import { AuthGoogleComponent } from './components/auth-google/auth-google.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './components/guards/login.guards';
import { VersionComponent } from './components/version/version.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';

const routes: Routes = [
  
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: '', redirectTo: '/issueCreated', pathMatch: 'full' },
  // { path: 'issueCreated', component: IssueCreatedComponent },
  // { path: 'login', component: AuthGoogleComponent },

  {path: 'login', component: LoginComponent },

  {path: 'home', component: HomeComponent, 
    canActivate: [LoginGuard],
    children:[
      { path: 'issueCreated', component: IssueCreatedComponent },
      { path: '', component: IssueCreateFormComponent },
      { path: 'version', component: VersionComponent },
      { path: 'ls', component: IssuesListComponent },
      
    ]
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
