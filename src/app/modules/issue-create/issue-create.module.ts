import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueCreateRoutingModule } from './issue-create-routing.module';

import { NuevoIncidenteComponent } from './pages/nuevo-incidente/nuevo-incidente.component';
import { NuevoRequerimientoComponent } from './pages/nuevo-requerimiento/nuevo-requerimiento.component';
import { SharedModule } from '../shared/shared.module';
import { NuevoSubtipoComponent } from './pages/nuevo-subtipo/nuevo-subtipo.component';






@NgModule({
    declarations: [
        NuevoIncidenteComponent,
        NuevoRequerimientoComponent,
        NuevoSubtipoComponent,
    ],
    imports: [
        CommonModule,
        IssueCreateRoutingModule,
        SharedModule
    ]
})
export class IssueCreateModule { }
