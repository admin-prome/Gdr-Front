import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  constructor() { }

  optionCards: any[] = []
  matriz: any[] = [
    {
      'url': '../issue-create',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/traditionalForm.png',
      'titulo': 'Formulario Tradicional',
      'icon': 'add_circle',
      'descripcion': 'Experimente la familiaridad del formulario clásico que ha estado utilizando en esta sección, vigente hasta el 01/02/2024',
      'color':'279D2E'
      },
      {
      'url': '../issue-create/new-issue',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/newForm.png',
      'titulo': 'Nuevo Formulario',
      'icon': 'add_task',
      'descripcion': 'Descubra todo el potencial de esta herramienta mediante nuestro nuevo formulario, diseñado para ofrecer una experiencia mejorada.',
      'color':'25B4BD'
      },
      {
      'url': '../help',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/help.png',
      'titulo': 'Ayuda',
      'icon': 'question_mark',
      'descripcion': 'Acceda a toda la información necesaria para aprender a realizar su primera carga. Consulte nuestra sección de ayuda para obtener orientación detallada.',
      'color':'0360AA'
    },
      {
        'url': '../dashboard',
        'id': 'Cuenta_cdni_comercios_referidos',
        'imagenSrc': '../../../../../assets/cardImgs/help.png',
        'titulo': 'Mi Tablero',
        'icon': 'dashboard',
        'descripcion': 'Acceda a toda la información de los estados de sus requerimientos e incidentes cargados.',
        'color':'59358B'
        }
  ];
  sucursal: any[] = [
    {
      'url': '../nuevo-incidente/cuota-mayor',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/feeAmount.png',
      'titulo': 'Créditos con cuota mayor a 1 Millón',
      'icon': 'paid',
      'descripcion': 'Registre las solicitudes cuyo monto de cuota sean mayores 1 Millon de pesos',
      'color':'aa1840'
      },
      {
        'url': '../help',
        'id': 'Cuenta_cdni_comercios_referidos',
        'imagenSrc': '../../../../../assets/cardImgs/help.png',
        'titulo': 'Ayuda',
        'icon': 'question_mark',
        'descripcion': 'Acceda a toda la información necesaria para aprender a realizar su primera carga. Consulte nuestra sección de ayuda para obtener orientación detallada.',
        'color':'0360AA'
      },
  ]
  branch: string = ''
  ngOnInit(): void {

    this.branch = this.getCredential();
    if (this.branch == 'Zona Casa Matriz') {
      this.optionCards = this.sucursal;
    }
    else{
      this.optionCards = this.matriz;
    }
  }

  getCredential() {
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);
      return userObject.userDetails.branch_zone;
      ;
    }
  }
  
}
