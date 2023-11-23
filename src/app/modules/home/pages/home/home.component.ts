import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  constructor() { }

  optionCards: any[] = [
    {
      'url': '../issue-create',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/traditionalForm.png',
      'titulo': 'Formulario Tradicional',
      'descripcion': 'Experimente la familiaridad del formulario clásico que ha estado utilizando en esta sección hasta ahora.'
      },
      {
      'url': '../issue-create/new-issue',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/newForm.png',
      'titulo': 'Nuevo Formulario',
      'descripcion': 'Descubra todo el potencial de esta herramienta mediante nuestro nuevo formulario, diseñado para ofrecer una experiencia mejorada.'
      },
      {
      'url': '../help',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/help.png',
      'titulo': 'Ayuda',
      'descripcion': 'Acceda a toda la información necesaria para aprender a realizar su primera carga. Consulte nuestra sección de ayuda para obtener orientación detallada.'
      }
  ];
  ngOnInit(): void {
  }


}
