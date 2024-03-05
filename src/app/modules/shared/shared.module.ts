import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ImgCardComponent, ImgCardModule } from 'src/app/components/img-card/img-card.component';



@NgModule({
  declarations: [
    CardComponent, 
    
  ],
  imports: [
    CommonModule,
    ImgCardModule
    
  ],
  exports:[
    CardComponent,
    ImgCardModule

  ]
})
export class SharedModule { }
