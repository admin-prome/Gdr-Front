import { NgModule } from '@angular/core';
import { NuevoIncidenteComponent } from './pages/nuevo-incidente/nuevo-incidente.component';
import { NuevoRequerimientoComponent } from './pages/nuevo-requerimiento/nuevo-requerimiento.component';
import { RouterModule, Routes } from '@angular/router';
import { NuevoSubtipoComponent } from './pages/nuevo-subtipo/nuevo-subtipo.component';

const routes: Routes = [
  {
    path: '',
   
    children: [
      {
        path: 'nuevo',
        component: NuevoIncidenteComponent,
        children: [
          { path: 'subtipo', component: NuevoSubtipoComponent },
          { path: '', component: NuevoIncidenteComponent }       
        ]  
      },
      {path: 'subtipo', component: NuevoSubtipoComponent},

      {path: 'nuevo-requerimiento', component: NuevoRequerimientoComponent},
      {path: '**', redirectTo: 'nuevo'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class IssueCreateRoutingModule { }
