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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    IssueCreatedComponent,
    IssueCreateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    ApiConnectionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
