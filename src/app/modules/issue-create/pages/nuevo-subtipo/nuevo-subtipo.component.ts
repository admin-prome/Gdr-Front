import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-subtipo',
  templateUrl: './nuevo-subtipo.component.html',
  styleUrls: ['./nuevo-subtipo.component.css']
})
export class NuevoSubtipoComponent implements OnInit {

  constructor() { }

  subissuetype = [
    
    {
      "name": "Gestión de la Demanda",
      "description": "Este sistema sirve como la puerta de entrada para todos los requerimientos de desarrollo, predictivos y correctivos que la empresa demanda del área de Tecnología. Si no reconoce el sistema asociado a su incidencia o si aún no existe, puede y debe seleccionar este subtipo.",
      "code": "GDD"
    },
    {
      "name": "C.R.M",
      "description": "Sistema de Gestión de Relaciones con el Cliente. Permite gestionar interacciones con clientes, seguimiento de ventas y análisis de datos para mejorar las relaciones comerciales.",
      "code": "CRM"
    },
    {
      "name": "Score PROME",
      "description": "Plataforma que calcula y evalúa el rendimiento y la eficacia de los procesos internos, proporcionando métricas clave para la toma de decisiones.",
      "code": "SCP"
    },
    {
      "name": "Calculadora/Nosis lote",
      "description": "Herramienta que facilita el cálculo y análisis masivo de datos relacionados con la información crediticia y financiera, utilizando la base de datos de Nosis.",
      "code": "NLO"
    },
    {
      "name": "Web institucional",
      "description": "Página web principal de la empresa que brinda información sobre la organización, sus servicios y actividades.",
      "code": "WWW"
    },
    {
      "name": "Rendición de viáticos",
      "description": "Sistema para registrar y gestionar los gastos y reembolsos asociados a los viajes y viáticos de los empleados.",
      "code": "REN"
    },
    {
      "name": "Gestor de requerimientos",
      "description": "Plataforma para la gestión eficiente de los requerimientos del proyecto, desde su creación hasta su implementación.",
      "code": "GDR"
    },
    {
      "name": "Portal PROME",
      "description": "Plataforma online que proporciona acceso a todos los sistemas y recursos de la empresa.",
      "code": "PPR"
    },
    {
      "name": "Comunidad PROME",
      "description": "Espacio virtual que disponibiliza medios de contacto comerciales de los clientes PROME, disponible al público en el sitio institucional.",
      "code": "CPR"
    },
    {
      "name": "Hace la Cuenta",
      "description": "Herramienta destinada a la promoción ‘Hace la cuenta’ que facilita la gestión de pago a los beneficiarios del programa .",
      "code": "HLC"
    },
    {
      "name": "Importación de Prospectos",
      "description": "Facilita la entrada de nuevos prospectos al sistema, simplificando el proceso de importación de datos.",
      "code": "IMP"
    },
     {
      "name": "Validador de Metas",
      "description": "Herramienta que verifica y valida metas según los criterios establecidos, asegurando la precisión y consistencia de los objetivos definidos de los ejecutivos comerciales.",
      "code": "VDM"
    },  
    {
      "name": "Importación Ministerios",
      "description": "Simplifica el proceso de importación de datos relacionados con Ministerios, mejorando la eficiencia en la gestión de la información.",
      "code": "IMM"
    },    
    {
      "name": "Portal de Finanzas",
      "description": "Portal del área de Finanzas que proporciona diversas herramientas con desarrollos nativos para agilizar las tareas diarias y eliminar procesos repetitivos.",
      "code": "PDM"
    }
    
  ]
  
  
  ngOnInit(): void {
  }

}
