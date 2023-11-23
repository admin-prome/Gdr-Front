import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpPanelComponent } from './help-panel/help-panel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HelpPanelComponent },

      { path: '**', redirectTo: 'ayuda' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
