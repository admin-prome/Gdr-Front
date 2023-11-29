import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ImgCardComponent } from 'src/app/components/img-card/img-card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';



@NgModule({
  declarations: [
    CardComponent,
    ImgCardComponent,    
    SpinnerComponent
    
  ],
  imports: [
    CommonModule
    
  ],
  exports:[
    CardComponent,
    ImgCardComponent,
    SpinnerComponent

  ]
})
export class SharedModule { }
