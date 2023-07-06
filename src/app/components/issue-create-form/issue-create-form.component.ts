import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { IssueCreate } from 'src/app/interfaces/issueCreate-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from '../../modules/material/shared.module';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Project } from '../../models/projects.models';
import { Initiatives } from '../../models/initiatives.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { EncryptionServiceService } from 'src/app/services/EncryptionService/encryption-service.service';



@Component({
  selector: 'app-issue-create-form',
  templateUrl: './issue-create-form.component.html',
  styleUrls: ['./issue-create-form.component.css'],
})
export class IssueCreateFormComponent implements OnInit {
  @Input() dataEntry: any;
  loading = false;
  clicked = false;
  attached = '';
  projectSelected = '';
  approveSelected = '';
  selected = '';
  requestForm : any;
  dataJsonNewIssue: any;
  projectsList: any;
  initiativesList: any;
  finalDate: string = '';
  normativeDate: string = '';
  formError: boolean = false;
  receivedData: boolean = false;
  audio = new Audio('../../../assets/sound/sound.mp3');  
  infraAudio = new Audio('../../../assets/sound/infraAudio.mp3');
  initiatives!: Initiatives;
  projects!: Project;
  normativeRequirement = null;
  disableButton : boolean = true;
  user: string | null = localStorage.getItem('userCredentialGDR');
  email: string | null = '';

  optionsPriority = [
    { value: 'Normativa', label: 'Normativa' },
    { value: 'Muy Alta', label: 'Muy Alta' }, 
    { value: 'Alta', label: 'Alta' },
    { value: 'Media', label: 'Media' },
    { value: 'Estándar', label: 'Estándar' }
  ];

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
    {value: "CPR", label: "Comunidad PPROME"},
    {value: "HLC", label: "Hace la Cuenta"}
  ];
  
  subOptionsIssueINF = [
    {value: "INF", label: "Infraestructura"}, 
    {value: "SEG", label: "Seguridad Informática"}
  ];

  managersOptions = [
    { value: "6228d69b4160640069ca557b", name: "Alejandro Bermann" },
    { value: "616872d97a6be400718d74b2", name: "Ariel Cosentino" },
    { value: "70121:5207ec8f-c9f4-456f-9116-2699e4c2f324", name: "Carmen Rojas" },
    { value: "61bbafde08e4e00069aef74e", name: "Gisela Marino" },
    { value: "I6171a81dbcb57400682d861e", name: "Ignacio Stella" },
    { value: "5cb0e51cfb6145589296296a", name: "Juan Carlos Canepa" },
    { value: "60b55e675fa6f1006f93d22b", name: "Mariela Luna" }
  ];
  
  userCredential = '';

  constructor(
    private fb: FormBuilder,
    private ConnectionService: ApiConnectionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private encryptionService: EncryptionServiceService
  ) {
    // this.loadSpinner();
   
    this.projectsList = [];   
    this.dataJsonNewIssue = {};
    this.getAllProjects;
    
    this.dataJsonNewIssue = new IssueCreate();
    this.dataEntry = '';

    this.requestForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      project: new FormControl(''),
      issueType: new FormControl('', [Validators.required]),
      subIssueType: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      approvers: new FormControl('', [Validators.required]),
      managment: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      impact: new FormControl('', [Validators.required]),
      attached: new FormControl(''),
      finalDate: new FormControl(''),
      normativeDate: new FormControl(''),
      initiative: new FormControl(''),
      normativeRequirement: new FormControl(false),
      userCredential: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // this.loadSpinner();

    if (this.user) {
      try {
        const userObject = JSON.parse(this.user);
        this.user = userObject;

        console.log(userObject.email)
        
        if (this.isTecno(userObject.email)){
          console.log(this.optionsIssue);
          console.log(this.optionsTecnoIssue);
          this.optionsIssue = this.optionsIssue.concat(this.optionsTecnoIssue);
          console.log(this.optionsIssue);
        }
        
      } 
      catch (error) {
        console.error('Error al analizar el objeto JSON:', error);
       }
    } 
    else {
      console.log("No se encontró ningún valor en el almacenamiento local para la clave especificada");
      }

    this.getAllProjects();    
    
  };

 

  onPriorityChange(): void {
    // this.normativeRequirement = this.requestForm.priority.value;   
  }



  getAllProjects(): any {
    this.openSpinner();
    this.ConnectionService.GetAllProjects().subscribe((response) => {
      
      
      this.projectsList = response.projects; // Asigna la respuesta directamente a projectsList
      if (this.projectsList){
        // this.displaySnackbar(
        //   'No se pudieron obtener los campos PROJECTOS. Por favor, actualice el formulario o pongase en contacnto con el administrador'
        // );
      }
      this.initiativesList = response.initiatives; // Inicializa la lista de iniciativas como un array vacío
      if (this.initiativesList){
        // this.displaySnackbar(
        //   'No se pudieron obtener los campos INICIATIVAS. Por favor, actualice el formulario o pongase en contacto con el administrador'
        // );
      }
     
    
    this.closeSpinner();
    });
  }



  sendForm() {
    this.validateForm();
   
    
    if (this.requestForm.invalid != true) {
      this.ConnectionService.PostNewIssue(this.dataJsonNewIssue).subscribe(
        (response) => {
          this.dataEntry = Object.values(response);
          this.receivedData = true;          
          if(this.email == environment.credits){
            this.infraAudio.play();     
          }
          else{            
            this.audio.play();
            }
          this.requestForm.clearAsyncValidators();
          this.loadSpinner();
        },
        (error) => {
          console.error(error);
          this.formError = true;
          this.displaySnackbar(
            'Su requerimiento no pudo ser creado. Por favor, reenvie el formulario'
          );
          this.enableButton();

        }
      );
    } else {
      this.displaySnackbar(
        'Por favor, complete los campos requeridos para enviar'
      );
    }
  }

  formatDate(finalDate: any): any {
    const fechaFormateada = formatDate(finalDate, 'yyyy-MM-dd', 'en-US');
    return fechaFormateada;
  }

  displaySnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public loadSpinner() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  public openSpinner(){
    this.loading = true;
  }

  public closeSpinner(){
    this.loading = false;
  }
  


  validateForm() {
    const finalDate = this.requestForm.value.finalDate;
    const normativeDate = this.requestForm.value.normativeDate;
    this.dataJsonNewIssue.key = this.requestForm.value.project;
    this.dataJsonNewIssue.issueType = this.requestForm.value.issueType;
    this.dataJsonNewIssue.subIssueType = this.requestForm.value.subIssueType;
    this.dataJsonNewIssue.summary = this.requestForm.value.title;
    this.dataJsonNewIssue.priority = this.requestForm.value.priority;
    this.dataJsonNewIssue.approvers = this.requestForm.value.approvers;
    this.dataJsonNewIssue.managment = this.requestForm.value.managment;
    this.dataJsonNewIssue.description = this.requestForm.value.description;
    this.dataJsonNewIssue.impact = this.requestForm.value.impact;
    this.dataJsonNewIssue.attached = this.requestForm.value.attached;
    this.dataJsonNewIssue.initiative = this.requestForm.value.initiative;
    this.dataJsonNewIssue.type = 'Epic';  
    this.dataJsonNewIssue.normativeRequirement = this.requestForm.value.normativeRequirement;
    this.dataJsonNewIssue.userCredential = this.user;
    
    

    if (finalDate.length != 0) {
      this.dataJsonNewIssue.finalDate = this.formatDate(finalDate);
    }

    if (normativeDate.length != 0) {
      this.dataJsonNewIssue.normativeDate = this.formatDate(normativeDate);
    }
    
    return this.dataJsonNewIssue;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
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

}
