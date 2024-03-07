import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueCreateRoutingModule } from './issue-create-routing.module';

import { NuevoIncidenteComponent } from './pages/nuevo-incidente/nuevo-incidente.component';
import { NuevoRequerimientoComponent } from './pages/nuevo-requerimiento/nuevo-requerimiento.component';
import { SharedModule } from '../shared/shared.module';
import { NuevoSubtipoComponent } from './pages/nuevo-subtipo/nuevo-subtipo.component';
import { AmountMillionComponent } from './pages/amount-million/amount-million.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';





@NgModule({
    declarations: [
        NuevoIncidenteComponent,
        NuevoRequerimientoComponent,
        NuevoSubtipoComponent,
        AmountMillionComponent,
    ],
    imports: [
        CommonModule,
        IssueCreateRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCardModule

    ]
})
export class IssueCreateModule { }
