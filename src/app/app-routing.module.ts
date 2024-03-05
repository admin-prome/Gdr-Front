import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IssueCreatedComponent } from './components/issue-created/issue-created.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';
import { AuthGoogleComponent } from './components/guards/auth-google/auth-google.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './components/guards/login.guards';
import { VersionComponent } from './pages/version/version.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssueCreateComponent } from './pages/forms/issue-create/issue-create.component';
import { NewIssueComponent } from './pages/new-issue/new-issue/new-issue.component';
import { ImgCardComponent } from './components/img-card/img-card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'issue-create',
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'issueCreated', component: IssueCreatedComponent },      
      { path: 'ls', component: IssuesListComponent },
      { path: 'new-issue', component: IssueCreateComponent },
      { path: 'card', component: ImgCardComponent },
      { path: '', component: IssueCreateFormComponent }, // Mueve esta ruta hija aquí
    ]
  },
  
  { path: 'version', component: VersionComponent },

  { path: 'home', canActivate: [LoginGuard], loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },

  { path: 'nuevo-incidente', canActivate: [LoginGuard], loadChildren: () => import('./modules/issue-create/issue-create.module').then(m => m.IssueCreateModule) },
 
  { path: 'help', canActivate: [LoginGuard], loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule) },

  { path: 'dashboard', canActivate: [LoginGuard], loadChildren: () => import('./modules/issue-dashboard/issue-dashboard.module').then(m => m.IssueDashboardModule) },

  { path: 'incidencia', canActivate: [LoginGuard], loadChildren: () => import('./pages/new-issue/new-issue.module').then(m => m.NewIssueModule) },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
