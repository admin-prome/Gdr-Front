import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Pagina {
  url: string;
  id: string;
  imagenSrc: string;
  titulo: string;
  icon: string;
  descripcion: string;
  color:string;
}

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.css'], 
})




export class ImgCardComponent implements OnInit {
  
  
  @Input() pagina: Pagina | undefined;
  
  cardData: Pagina | undefined
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cardData = this.pagina;
  }

  navigateTo(site: string){
    console.log(site);
    this.router.navigate([site]);
  }
  
}
@NgModule({
  declarations: [ImgCardComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ImgCardComponent],
})
export class ImgCardModule {}