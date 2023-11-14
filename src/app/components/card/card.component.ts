import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  data: any = [];


  ngOnInit(): void {
    this.data = [
      {
        "title": "Nueva Busqueda",
        "startDate": "2022-11-04"
      },
      {
        "title": "Administrador",
        "startDate": "2022-11-07"
      },
      ,
      {
        "title": "Postulantes",
        "startDate": "2022-11-07"
      },
      {
        "title": "Postulantes",
        "startDate": "2022-11-07"
      }
      
    ]
    
  }

}
