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
import * as CryptoJS from 'crypto-js';
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
  initiatives!: Initiatives;
  projects!: Project;
  normativeRequirement = null;
  disableButton : boolean = true;
  optionsPriority = [
    { value: 'Muy Alta', label: 'Muy Alta' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Baja', label: 'Baja' },
    { value: 'Normativa', label: 'Normativa' }
  ];

  managersOptions: any[] = [
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
      userCredential: new FormControl('')
    });
  }

  ngOnInit(): void {
    // this.loadSpinner();
    const userCredential = localStorage.getItem('userCredentialGDR');
    this.getAllProjects();    
    
    // console.log(this.dataJsonNewIssue.priority);
    // console.log(this.requestForm.get('priority'));  

    
    // Recuperar los datos encriptados del localStorage
    const encryptedData = localStorage.getItem('userCredentialGDR');
    
    if (encryptedData) {
      // console.log('esto es la data traida del local storage: ',encryptedData);
      // Desencriptar los datos utilizando la misma clave secreta
      // const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.key);
      // const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      
      // const decryptedData = this.encryptionService.decryptData(encryptedData);
      // console.log('Esto es la data desencriptada:', decryptedData);
      // Convertir los datos desencriptados de nuevo a un objeto
      const responsePayload = JSON.parse(encryptedData);
      // console.log('esto es la data responsepayload: ', responsePayload)
      // Mapeo del Formulario
      this.requestForm.userCredential = encryptedData;

      // Utilizar los datos desencriptados según tus necesidades
    }


    
    if (this.requestForm.userCredential) {
      const usuario = JSON.parse(this.requestForm.userCredential);

      // Utiliza los datos del usuario como desees
    } else {
      // No se encontraron datos en el sessionStorage
    }

    // const valor = this.sessionStorage.get('googleCredential');
    
  };

 

  onPriorityChange(): void {
    this.normativeRequirement = this.requestForm.priority.value;
   
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


  // getDataForm(): any{
  //   this.ConnectionService.GetDataForm().subscribe((response) => {
  //     this.initiatives = response.initiatives;
  //     console.log(this.initiatives)
  //     // this.projects = response.projects;
  //   })
  // }

  sendForm() {
    this.validateForm();
   
    
    if (this.requestForm.invalid != true) {
      this.ConnectionService.PostNewIssue(this.dataJsonNewIssue).subscribe(
        (response) => {
          this.dataEntry = Object.values(response);
          this.receivedData = true;
          this.audio.play();
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
    this.dataJsonNewIssue.summary = this.requestForm.value.title;
    this.dataJsonNewIssue.priority = this.requestForm.value.priority;
    this.dataJsonNewIssue.approvers = this.requestForm.value.approvers;
    this.dataJsonNewIssue.managment = this.requestForm.value.managment;
    this.dataJsonNewIssue.description = this.requestForm.value.description;
    this.dataJsonNewIssue.impact = this.requestForm.value.impact;
    this.dataJsonNewIssue.attached = this.requestForm.value.attached;
    this.dataJsonNewIssue.initiative = this.requestForm.value.initiative;
    this.dataJsonNewIssue.type = 'Epic';
    this.dataJsonNewIssue.user = JSON.parse(this.requestForm.userCredential);
    

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

}
