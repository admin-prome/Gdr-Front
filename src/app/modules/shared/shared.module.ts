import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ImgCardComponent } from 'src/app/components/img-card/img-card.component';



@NgModule({
  declarations: [
    CardComponent,
    ImgCardComponent
  ],
  imports: [
    CommonModule
    
  ],
  exports:[
    CardComponent,
    ImgCardComponent
  ]
})
export class SharedModule { }
