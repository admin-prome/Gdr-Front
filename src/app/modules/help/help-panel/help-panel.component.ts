import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.css']
})
export class HelpPanelComponent implements OnInit {
  panelOpenState = false;
  constructor() { }
  issuetype = [
    {
      "name": "Requerimiento de Desarrollo",
      "description": "Necesidad del usuario final específicamente detallada de una funcionalidad, característica o capacidad que un software (CRM, Bases Negativas, desarrollo, etc), debe tener para satisfacer las necesidades del usuario. Esta especificación solicitada tiene como finalidad guiar en el proceso de desarrollo de software y sirve como base para el análisis, diseño,implementación y las pruebas, con su posterior pasaje a producción",
      "id": 1,
      "code": "REQ"
    },
    {
      "name": "Requerimiento de Infraestructura",
      "description": "Necesidad del usuario final para respaldar la ejecución de aplicaciones o sistemas. Incluye hardware, software, redes y otros componentes necesarios para garantizar el rendimiento, la seguridad y la disponibilidad de la infraestructura tecnológica.",
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
