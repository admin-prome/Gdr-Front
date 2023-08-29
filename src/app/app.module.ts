import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';
import { IssueCreatedComponent } from './components/issue-created/issue-created.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/material/shared.module';

import { ApiConnectionService } from './services/api-connection-service.service';
import { KeyvaultServicesServices } from './services/keyvault/keyvault-services.service';

import { AuthGoogleComponent } from './components/auth-google/auth-google.component';
import { LoginComponent } from './components/login/login.component';
import { EncryptionServiceService } from './services/EncryptionService/encryption-service.service';
import { LoginService } from './services/userHandler/login/login.service';
import { VersionComponent } from './components/version/version.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { CardComponent } from './components/card/card.component';
import { JiraErrorsComponent } from './components/errors/jira-errors/jira-errors.component';
import { IssueStepperCreateComponent } from './components/issue-stepper-create/issue-stepper-create.component';

import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    IssueCreatedComponent,
    IssueCreateFormComponent,
    AuthGoogleComponent,    
    LoginComponent, 
    VersionComponent, 
    IssuesListComponent, 
    CardComponent, 
    JiraErrorsComponent, 
    IssueStepperCreateComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatStepperModule,
  ],
  providers: [
    ApiConnectionService,
    KeyvaultServicesServices,
    EncryptionServiceService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
