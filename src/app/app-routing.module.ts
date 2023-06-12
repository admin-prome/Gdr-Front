import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { IssueCreatedComponent } from './components/issue-created/issue-created.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';
import { AuthGoogleComponent } from './components/auth-google/auth-google.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './components/guards/login.guards';
const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // { path: 'login', component: AuthGoogleComponent },

  { path: 'login', component: LoginComponent },

  {path: 'home', component: HomeComponent, 
    canActivate: [LoginGuard],
    children:[
      { path: 'issueCreated', component: IssueCreatedComponent },
      { path: '', component: IssueCreateFormComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
