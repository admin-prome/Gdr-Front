import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service'
import { IssueCreate } from 'src/app/data/interfaces/issueCreate-interface';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Project } from '../../data/models/projects.models';
import { Initiatives } from '../../data/models/initiatives.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { EncryptionServiceService } from 'src/app/services/EncryptionService/encryption-service.service';
import { MatSelectChange } from '@angular/material/select';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';



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
  user: string | null = localStorage.getItem('credentialGDR');
  email: string | null = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  reporter: string | null = '';
  //isInternalTecno: string | null = '';
  tecnologia: boolean = false;

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
    {value: "CPR", label: "Comunidad PROME"},
    {value: "HLC", label: "Hace la Cuenta"}
  ];
  
  subOptionsIssueINF = [
    {value: "INF", label: "Infraestructura"}, 
    {value: "SEG", label: "Seguridad Informática"}
  ];

  managersOptions = [    
    { email: "abermann@provinciamicrocreditos.com", value: "6228d69b4160640069ca557b", name: "Alejandro Daniel Bermann", management: "Administracion y Finanzas"},
    { email: "acosentino@provinciamicrocreditos.com", value: "616872d97a6be400718d74b2", name: "Ariel Cosentino", management: "Red de Sucursales"},
    { email: "crojas@provinciamicrocreditos.com", value: "70121:5207ec8f-c9f4-456f-9116-2699e4c2f324", name: "Carmen Eugenia Rojas Jaramillo", management: "Cumplimiento y Procesos"},
    { email: "efernandez@provinciamicrocreditos.co", value: "615e66da289a54006a2ca1e3", name: "Emiliano Fernandez", management: "Inteligencia de Negocios y Gestion estrategica"},
    { email: "gmarino@provinciamicrocreditos.com", value: "61bbafde08e4e00069aef74e", name: "Gisela Elin Marino", management: "Comercial"},
    { email: "istella@provinciamicrocreditos.com", value: "6171a81dbcb57400682d861e", name: "Ignacio Fernando Stella", management: "Personas"},
    { email: "jcanepa@provinciamicrocreditos.com", value: "5cb0e51cfb6145589296296a", name: "Juan Carlos Canepa", management: "Tecnologia"},
    { email: "lottone@provinciamicrocreditos.co", value: "6228d79dc88f10006832563a", name: "Leandro Martin Ottone", management: "Direccion Ejecutiva"},
    { email: "mluna@provinciamicrocreditos.com", value: "60b55e675fa6f1006f93d22b", name: "Mariela Alejandra Luna", management: "Riesgo"},
    { email: "mcgomez@provinciamicrocreditos.co", value: "61aa6bb06d002b006b02630e", name: "Mar­ia Carolina Gomez", management: "Comunicacion Institucional"},    
    { email: "srosanovich@provinciamicrocreditos.co", value: "6228d870a1245000688b1065", name: "Sergio Andres Rosanovich", management: "Investigacion y Capacitacion"}
  ];
  
  
  userCredential = '';
  approversList: any;
  private fileTmb: any;

  constructor(
    private fb: FormBuilder,
    private ConnectionService: ApiConnectionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sharedDataService: SharedDataService,  
  ) {
    
   
    this.projectsList = [];   
    this.dataJsonNewIssue = {};   
    this.dataJsonNewIssue = new IssueCreate();
    this.dataEntry = '';

    this.requestForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      project: new FormControl(''),
      issuetype: new FormControl('', [Validators.required]),
      subissuetype: new FormControl('', [Validators.required]),
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
      isInternalTecno:new FormControl('no')
      
    });
  }

  ngOnInit(): void {
    // this.loadSpinner();

    if (this.user) {
      try {
        const userObject = JSON.parse(this.user);
        this.user = userObject;
        this.email = userObject.email;
        this.reporter = userObject.idJIRA;
    
        if(userObject.idJIRA = null){     
          console.log('No se hallo el idJIRA')    
          localStorage.clear();
          this.router.navigate(['/login']);
        };     
        // if (this.reporter == "6228d8734160640069ca5686"){
        //   localStorage.removeItem("userCredentialGDR");
        //   this.displaySnackbar("Intentando obtener usuario de JIRA")
        //   this.router.navigate(['/login']);

        // }     

        if (this.isTecno(userObject.email)){
          this.tecnologia = true;
        }

        if (this.enableINC(userObject.email)){            
          this.optionsIssue = this.optionsIssue.concat(this.optionsTecnoIssue);      
        }
         
        
      } 
      catch (error) {
        console.error('Error al analizar el objeto JSON:', error);
       }
    } 
    else {
      console.log("No se encontró ningún valor en el almacenamiento local para la clave especificada");
      localStorage.clear();
      this.router.navigate(["/login"]);
      }

    this.getAllProjects();    
    
    
  };

 

  onPriorityChange(): void {
    // this.normativeRequirement = this.requestForm.priority.value;   
  }

  onFileSelected($event: any) {
    const file = $event.target.files[0];
   
   
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024 * 1024; // 2 GB en bytes
      if (file.size <= maxSizeInBytes) {
        this.fileTmb = {
          fileRaw: file,
          fileName: file.name
        }
        this.selectedFile = file;
        this.selectedFileName = file ? file.name : '';
       
      } 
      else {
        this.selectedFileName = '';
        this.displaySnackbar('El archivo excede el tamaño máximo permitido (2 GB)');
      }
    }

  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  }


  getAllProjects(): any {
    this.openSpinner();
  
    this.ConnectionService.GetAllProjects()
      .pipe(
        timeout(10000),
        catchError((error) => {
          console.log('Error o timeout al obtener los datos del servidor:', error);
          // En caso de error o timeout, usa los datos de la variable local (this.managersOptions)
          return of({ approvers: this.managersOptions || [] });
        })
      )
      .subscribe((response) => {
        
  
        if (response && response.approvers) {
          this.approversList = response.approvers;
          
        } else {
         
          this.approversList = this.managersOptions || [];
        }
  
        this.closeSpinner();
      });
  }


  sendForm():void {
    this.openSpinner();
    this.validateForm();  
    
    
    const body = new FormData();
    if (this.fileTmb != null){
      body.append('myFile', this.fileTmb.fileRaw, this.fileTmb.fileName);
      
    }
      
    body.append('myJson', JSON.stringify(this.dataJsonNewIssue));


    if (this.requestForm.invalid != true) {
      this.ConnectionService.PostNewIssue(body).subscribe(
        (response) => {
          this.dataEntry = Object.values(response);
          //console.log("esto es la respuesta del back",this.dataEntry);      
          
          if (this.dataEntry[2] == "200"){
              this.closeSpinner();
              this.receivedData = true; 
              this.sharedDataService.setReceivedData(this.dataEntry)
              if(this.email == environment.credits){
                this.infraAudio.play();     
              }
              else{            
                this.audio.play();
                }
              this.requestForm.clearAsyncValidators();
              // this.loadSpinner();
            }
          else{
           
            this.receivedData = false;
            this.formError = true;
            this.closeSpinner();
            this.displaySnackbar(
                                'Su requerimiento no pudo ser creado. Por favor, reenvie el formulario'
                                );
           //this.enableButton();
          }
          },
         
        (error) => {
          console.error(error);
          this.formError = true;

          this.displaySnackbar(
            'Su requerimiento no pudo ser creado. Por favor, reenvie el formulario'
          );
          //this.enableButton();
          this.closeSpinner();
          
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
  
 

  // Método para obtener el objeto completo según el índice seleccionado
  onApproverSelection(event: MatSelectChange): void {
  const selectedApprover = event.value;
 
  }



  validateForm() {
    const finalDate = this.requestForm.value.finalDate;
    const normativeDate = this.requestForm.value.normativeDate;
    this.dataJsonNewIssue.key = this.requestForm.value.project;
    this.dataJsonNewIssue.issuetype = this.requestForm.value.issuetype;
    this.dataJsonNewIssue.subissuetype = this.requestForm.value.subissuetype;
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

    this.dataJsonNewIssue.reporter = this.reporter;
    this.dataJsonNewIssue.isTecno = this.requestForm.get('isInternalTecno').value
    

    const credentialJson = localStorage.getItem('credentialGDR');
    if (credentialJson !== null) {
      this.dataJsonNewIssue.userCredential = JSON.parse(credentialJson);
    } else {
      console.log('No se encontraron las credenciales del usuario');
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
    
    
    if (finalDate != 0) {
      this.dataJsonNewIssue.finalDate = this.formatDate(finalDate);
      
    }
    else{this.dataJsonNewIssue.finalDate = "None"}

    if (normativeDate != 0) {
      this.dataJsonNewIssue.normativeDate = this.formatDate(normativeDate);
    }
    else{this.dataJsonNewIssue.normativeDate = "None"}

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

  enableINC(user:string){

    let enable: boolean = false;

    if (environment.soporte.includes(user) || environment.tecnologia.includes(user) || environment.procesos.includes(user)) {
      enable = true;  }

  return enable;
    

  }

 
}
