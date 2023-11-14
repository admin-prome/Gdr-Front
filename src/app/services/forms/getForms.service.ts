import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formStepper } from 'src/app/data/interfaces/formStepper-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetFormsService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postFormData(formData: any) {
    const headers = new HttpHeaders({
      'Authorization-Key': environment.AuthorizationKey,
      'Content-Type': 'application/json; charset=utf-8'      
    });
    const url = this.backendUrl+'GetForm'
   
    return this.http.post<any>(url, formData, { headers: headers });
  }
  

  traditional: Record<string, formStepper> = {

    "file": {     
      "type": "file",
      "key": "file",
      "label": "Adjuntar archivo",
      "name": "archivo",
      "placeholder": "Ingrese un titulo descriptivo",
      "required": false,
      "value":"",
      "validators": {
                "required":false, 
                "requiredTrue": false
              },
      "accept": ".pdf,.doc,.jpg,.png,.tiff,.xls",
      "maxFileSize": 2

    },
    "attached": {
      "type": "input",
      "key": "attached",
      "label": "Ingrese el enlace a la",
      "name": "Documentación",
      "placeholder": "Ingrese un enlace",
      "required": false,
      "value":"",
      "validators": {},
      "return": "string"
      
    },
    "isTecno": {
      "type": "radio",
      "key": "isTecno",
      "label": "¿Es un requerimiento interno de Tecnología?",
      "name" : "origen",
      "options": {
        "TEC": {
          "value": "Si",
          "label": "Si",
          
        },
        "NOTEC": {
          "value": "No",
          "label": "No"
        }
        
      },
      "value":"no",
      "validators": {
        "required":true, 
        "nullValidator": true
      },

      "return": "string"
    },
    "summary": {
      "type": "input",
      "key": "summary",
      "label": "Ingrese el",
      "name": "Titulo",
      "placeholder": "Ingrese un titulo descriptivo",
      "required": true,
      "value":"",
      "validators": {
                "required":true, 
                "requiredTrue": true
              },
      "return": "string"
      
    },
    "issuetype": {
      "type": "select",
      "key": "issuetype",
      "label": "Elija el",
      "name": "tipo de incidencia",
      "placeholder": "Elije el tipo de incidencia",      
      "options": {
        
        "REQ": 
          [{"value": "REQ",
          "label": "Requerimiento de Desarrollo",
          //"subIssueOptions": this.subOptionsIssueREQ
        }]
        ,
        "INC": [{
          "value": "INC",
          "label": "Incidencia",
          //"subIssueOptions": this.subOptionsIssueINF
        }],
        "INF": [{
          "value": "INF",
          "label": "Infraestructura"
        }],
        "SEG": [{
          "value": "SEG",
          "label": "Seguridad Informática"
        }]
      },
      "required": true,
      "value":"",
      "validators": {
        "required":true, 
        "minLength": 8
      },
      "condition": true,
      "dependentOn": "false",
      "dependencies": [],
      "dependents": ["subIssueType"],
      "return": "string"
    },
    "subissuetype": {
      "type": "select",
      "key": "subissuetype",
      "label": "Elija el",
      "name": "subtipo de incidencia",
      "placeholder": "Elije el subtipo de incidencia",
      "options": {
        "INF": [
          { "value": "INF", "label": "Infraestructura" },
          { "value": "SEG", "label": "Seguridad Informática" }
        ],
        "REQ": [
          { "value": "CRM", "label": "C.R.M" },
          { "value": "SCP", "label": "Score PROME" },
          { "value": "NLO", "label": "Calculadora/Nosis lote" },
          { "value": "WWW", "label": "Web institucional" },
          { "value": "REN", "label": "Rendición de viáticos" },
          { "value": "GDR", "label": "Gestor de requerimientos" },
          { "value": "PPR", "label": "Portal PROME" },
          { "value": "CPR", "label": "Comunidad PROME" },
          { "value": "HLC", "label": "Hace la Cuenta" }
        ],
        "INC": [
          { "value": "CRM", "label": "C.R.M" },
          { "value": "SCP", "label": "Score PROME" },
          { "value": "NLO", "label": "Calculadora/Nosis lote" },
          { "value": "WWW", "label": "Web institucional" },
          { "value": "REN", "label": "Rendición de viáticos" },
          { "value": "GDR", "label": "Gestor de requerimientos" },
          { "value": "PPR", "label": "Portal PROME" },
          { "value": "CPR", "label": "Comunidad PROME" },
          { "value": "HLC", "label": "Hace la Cuenta" }
        ]
      },
      "required": true,
      "value":"",
      "validators":{},
      "condition": true,
      "dependentOn": "issuetype",
      "dependencies": {
        
      },
      "return": "string"
    },
    "priority":{
      "type": "select",
      "key": "priority",
      "label": "Elija la",
      "name" : "Prioridad",
      "placeholder": "Elije la prioridad",
      "options": {
        "key": 
        [
          { value: 'Normativa', label: 'Normativa' },
          { value: 'Muy Alta', label: 'Muy Alta' }, 
          { value: 'Alta', label: 'Alta' },
          { value: 'Media', label: 'Media' },
          { value: 'Estándar', label: 'Estándar' }
        ]      
        },
      "required": true,  
      "value":"",
      "validators":{},
      "dependents": "",     
      "condition": true,
      "return": "string"
    },
    "approvers":{
      "type": "select",
      "key": "approvers",
      "label": "Elija la",
      "name" : "Aprobado por",
      "placeholder": "Elije quien aprueba el requerimiento o incidente",
      "options": {"key":
            [    
              { "email": "abermann@provinciamicrocreditos.com", "value": "6228d69b4160640069ca557b", "label": "Alejandro Daniel Bermann", "management": "Administracion y Finanzas"},
              { "email": "acosentino@provinciamicrocreditos.com", "value": "616872d97a6be400718d74b2", "label": "Ariel Cosentino", "management": "Red de Sucursales"},
              { "email": "crojas@provinciamicrocreditos.com", "value": "70121:5207ec8f-c9f4-456f-9116-2699e4c2f324", "label": "Carmen Eugenia Rojas Jaramillo", "management": "Cumplimiento y Procesos"},
              { "email": "efernandez@provinciamicrocreditos.co", "value": "615e66da289a54006a2ca1e3", "label": "Emiliano Fernandez", "management": "Inteligencia de Negocios y Gestion estrategica"},
              { "email": "gmarino@provinciamicrocreditos.com", "value": "61bbafde08e4e00069aef74e", "label": "Gisela Elin Marino", "management": "Comercial"},
              { "email": "istella@provinciamicrocreditos.com", "value": "6171a81dbcb57400682d861e", "label": "Ignacio Fernando Stella", "management": "Personas"},
              { "email": "jcanepa@provinciamicrocreditos.com", "value": "5cb0e51cfb6145589296296a", "label": "Juan Carlos Canepa", "management": "Tecnologia"},
              { "email": "lottone@provinciamicrocreditos.co", "value": "6228d79dc88f10006832563a", "label": "Leandro Martin Ottone", "management": "Direccion Ejecutiva"},
              { "email": "mluna@provinciamicrocreditos.com", "value": "60b55e675fa6f1006f93d22b", "label": "Mariela Alejandra Luna", "management": "Riesgo"},
              { "email": "mcgomez@provinciamicrocreditos.co", "value": "61aa6bb06d002b006b02630e", "label": "Mar­ia Carolina Gomez", "management": "Comunicacion Institucional"},    
              { "email": "srosanovich@provinciamicrocreditos.co", "value": "6228d870a1245000688b1065", "label": "Sergio Andres Rosanovich", "management": "Investigacion y Capacitacion"}
            ]      
          },      
      "required": true,  
      "value":"",
      "validators":{},     
      "condition": true,
      "dependents": "",
      "return": "json"
    },     
    "normativeDate": {
      "type": "datepicker",
      "key": "normativeDate",
      "label": "Elija la fecha del",
      "name": "Incidente o requerimiento normativo",
      "placeholder": "Elija la fecha normativa de implementación",   
      "options": {},
      "required": false,
      "value":"",
      "validators":{},
      "condition": true,
      "dependentOn": "issuetype",
      "dependencies": {
        "INF": [
          { "value": "INF", "label": "Infraestructura" },
          { "value": "SEG", "label": "Seguridad Informática" }
        ],
        "REQ": [
          { "value": "CRM", "label": "C.R.M" },
          { "value": "SCP", "label": "Score PROME" },
          { "value": "NLO", "label": "Calculadora/Nosis lote" },
          { "value": "WWW", "label": "Web institucional" },
          { "value": "REN", "label": "Rendición de viáticos" },
          { "value": "GDR", "label": "Gestor de requerimientos" },
          { "value": "PPR", "label": "Portal PROME" },
          { "value": "CPR", "label": "Comunidad PROME" },
          { "value": "HLC", "label": "Hace la Cuenta" }
        ],
        "INC": [
          { "value": "CRM", "label": "C.R.M" },
          { "value": "SCP", "label": "Score PROME" },
          { "value": "NLO", "label": "Calculadora/Nosis lote" },
          { "value": "WWW", "label": "Web institucional" },
          { "value": "REN", "label": "Rendición de viáticos" },
          { "value": "GDR", "label": "Gestor de requerimientos" },
          { "value": "PPR", "label": "Portal PROME" },
          { "value": "CPR", "label": "Comunidad PROME" },
          { "value": "HLC", "label": "Hace la Cuenta" }
        ]
      },
      "return": "string"
       

    },
    "finalDate":{
      "type": "datepicker",
      "key": "finalDate",
      "label": "Elija la fecha del",
      "name": "Incidente o requerimiento",
      "placeholder": "Elija la fecha estimada de implementación",
      "value":"",
      "return": "string",
      "required": false,
      
    },
    "managment": {
      "type": "textarea",
      "key": "managment",
      "label": "Ingrese el",
      "name": "Para (Beneficio)",
      "placeholder": "Ingrese el beneficio",
      "required": true,
      "value":"",
      "validators": {
        "required":true, 
        "minLength": 10
      },
      "return": "string"    
    }, 
    "impact": {
      "type": "textarea",
      "key": "impact",
      "label": "Ingrese el",
      "name": "Impacto",
      "placeholder": "Ingrese las areas, sistemas, etc donde impacta",
      "required": true,
      "value":"",
      "validators": {
        "required":true, 
        "minLength": 15
      },
      "return": "string"    
    },       
    "description": {
      "type": "textarea",
      "key": "description",
      "label": "Ingrese la",
      "name": "Funcionalidad",
      "placeholder": "Por favor, no escatime en palabras",
      "required": true,
      "value":"",
      "validators": {
        "required":true, 
        "minLength": 15,
        "maxLength": 25
      },
      "return": "string"    
    }    
  }   

}
