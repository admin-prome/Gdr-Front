import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IssueCreateFormComponent } from './components/issue-create-form/issue-create-form.component';
import { IssueCreatedComponent } from './components/issue-created/issue-created.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/material/shared.module';

import { ApiConnectionService } from './services/api-connection-service.service';
import { KeyvaultServicesServices } from './services/keyvault/keyvault-services.service';

import { AuthGoogleComponent } from './components/guards/auth-google/auth-google.component';
import { LoginComponent } from './pages/login/login.component';
import { EncryptionServiceService } from './services/EncryptionService/encryption-service.service';
import { LoginService } from './services/userHandler/login/login.service';
import { VersionComponent } from './pages/version/version.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { CardComponent } from './components/card/card.component';
import { JiraErrorsComponent } from './components/errors/jira-errors/jira-errors.component';
import { IssueStepperCreateComponent } from './components/issue-stepper-create/issue-stepper-create.component';

import {MatStepperModule} from '@angular/material/stepper';
import { IssuetypeComponent } from './components/issuetype/issuetype.component';
import { MaterialInputComponent } from './components/material/material-input/material-input.component';
import { MaterialSelectComponent } from './components/material/material-select/material-select.component';
import { MaterialTextareaComponent } from './components/material/material-textarea/material-textarea.component';
import { MaterialDatepickerComponent } from './components/material/material-datepicker/material-datepicker.component';
import { MaterialFileComponent } from './components/material/material-file/material-file.component';
import { MaterialRadioComponent } from './components/material/material-radio/material-radio.component';
import { MaterialCheckboxComponent } from './components/material/material-checkbox/material-checkbox.component';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { IssueCardComponent } from './components/issue-card/issue-card.component';
import { IssueCreateComponent } from './pages/forms/issue-create/issue-create.component';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';



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
    IssuetypeComponent,
    IssueStepperCreateComponent,
    MaterialInputComponent, 
    MaterialSelectComponent, 
    MaterialTextareaComponent, 
    MaterialDatepickerComponent, 
    MaterialFileComponent, 
    MaterialRadioComponent, 
    MaterialCheckboxComponent, IssueCardComponent, IssueCreateComponent, 
    
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatStepperModule,
    CoreModule,
    DataModule
  ],

  providers: [
    ApiConnectionService,
    KeyvaultServicesServices,
    EncryptionServiceService,
    LoginService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-la'}
  ],

  bootstrap: [AppComponent]
  
})
export class AppModule { }
