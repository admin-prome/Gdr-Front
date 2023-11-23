import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-incidente',
  templateUrl: './nuevo-incidente.component.html',
  styleUrls: ['./nuevo-incidente.component.css']
})
export class NuevoIncidenteComponent implements OnInit {

  constructor() { }  
  
  issuetype = [
    {
      "name": "Requerimiento de Desarrollo",
      "description": "Especificación detallada de una función, característica o capacidad que un software debe tener para satisfacer las necesidades del usuario. Guía el proceso de desarrollo de software y sirve como base para el diseño, la implementación y las pruebas.",
      "id": 1,
      "code": "REQ"
    },
    {
      "name": "Requerimiento de Infraestructura",
      "description": "Especificaciones y condiciones necesarias para respaldar la ejecución de aplicaciones o sistemas. Incluye hardware, software, redes y otros componentes necesarios para garantizar el rendimiento, la seguridad y la disponibilidad de la infraestructura tecnológica.",
      "id": 2,
      "code": "INF"
    },
    {
      "name": "Incidente",
      "description": "Evento no planificado o no deseado que interrumpe o afecta negativamente el funcionamiento normal de un sistema, servicio o proceso. Puede variar en gravedad e incluir interrupciones del servicio, problemas de seguridad u otros eventos que requieran respuesta y resolución.",
      "id": 3,
      "code": "INC"
    },
    {
      "name": "Requerimiento Correctivo",
      "description": "Solicitud o especificación para corregir un defecto, error o problema identificado en un software o sistema. Surge como respuesta a fallos o comportamientos no deseados y busca rectificar la situación para restablecer el funcionamiento adecuado del sistema.",
      "id": 4,
      "code": "FIX"
    }
  ]
  
  ngOnInit(): void {
    
  }

}
