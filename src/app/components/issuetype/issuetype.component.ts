import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issuetype',
  templateUrl: './issuetype.component.html',
  styleUrls: ['./issuetype.component.css']
})
export class IssuetypeComponent implements OnInit {
  optionsIssue = [
    {value: "REQ", label: "Requerimiento de Desarrollo"},   
    {value: "INF", label: "Requerimiento para Infraestructura"}  
  ];

  optionsTecnoIssue = [
    {value: "INC", label: "Incidencia"},
    {value: "FIX", label: "Corrección"}    
  ]

  subOptionsIssueREQ = [
    {value: "CRM", label: "C.R.M"}, 
    {value: "SCP", label: "Score PROME"}, 
    {value: "NLO", label: "Calculadora/Nosis lote"}, 
    {value: "WWW", label: "Web institucional"}, 
    {value: "REN", label: "Rendición de viáticos"},
    {value: "GDR", label: "Gestor de requerimientos"},
    {value: "PPR", label: "Portal PROME"},
    {value: "CPR", label: "Comunidad PROME"},
    {value: "HLC", label: "Hace la Cuenta"}
  ];
  
  subOptionsIssueINF = [
    {value: "INF", label: "Infraestructura"}, 
    {value: "SEG", label: "Seguridad Informática"}
  ];

  requestForm: any;
  disableButton: boolean = true;
  issuetype: any = ''
  
  constructor() {

    this.requestForm = new FormGroup({     
      issueType: new FormControl('', [Validators.required]),
      subIssueType: new FormControl('', [Validators.required])})


   }

  ngOnInit(): void {

    
  }


  onPriorityChange(): void{

  }

  enableButton() {
    this.disableButton = false;
  }

  isTecno(user: string) {
    let tecno: boolean = false;

    if (environment.tecnologia.includes(user)) {
      tecno = true;  }

    return tecno;
  }

  enableINC(user:string){

    let enable: boolean = false;

    if (environment.soporte.includes(user) || environment.tecnologia.includes(user) || environment.procesos.includes(user)) {
      enable = true;  }

  return enable;
    

  }

  
}
