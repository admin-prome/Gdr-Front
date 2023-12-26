import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { FormStep } from 'src/app/data/interfaces/issueStepper-interface';
import { formatDate } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JsonFormData, formStepper } from 'src/app/data/interfaces/formStepper-interface';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {NgSwitch, NgSwitchCase, AsyncPipe} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';

@Component({
  selector: 'app-issue-stepper-create',
  templateUrl: './issue-stepper-create.component.html',
  styleUrls: ['./issue-stepper-create.component.css'],
 
  
})

export class IssueStepperCreateComponent implements OnInit {
  @Input() dataForm: any;
  
  public myForm: FormGroup = this.fb.group({});  
  isLinear = false;
  formSteps: FormStep[] = [];
  formJson: any;
  step: any;
  mensajeDelHijo: string = '';
  sharedState: any = {}; // Objeto JSON compartido  
  optionSelected: any;
  selectedOption: string = '1';
  jsonSelected: any;
  steps: Array<any> = [];
  dataServices: any;
  opcionElegida: any;  
  disableButton: boolean = false; 
  reporter: any;
  email: any;
  tecnologia: boolean = false;
  user: string | null = localStorage.getItem('credentialGDR');
  keysServices: any[] = [];
  serviceGroups: any[][] = [];
  keyLength: number = 0;
  stepperOrientation: Observable<StepperOrientation>;
  private fileTmb: any;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  loading: boolean = false;
  clicked: boolean = false;
  formError: boolean = false;
  receivedData: boolean = false;
  audio = new Audio('../../../assets/sound/sound.mp3');  
  infraAudio = new Audio('../../../assets/sound/infraAudio.mp3');
  requestForm : any;
  dataEntry: any;
  
  


  constructor(
              private fb: FormBuilder,
              private router: Router,
              breakpointObserver: BreakpointObserver,
              private http: HttpClient,
              private ConnectionService: ApiConnectionService,            
              private snackBar: MatSnackBar,
              private sharedDataService: SharedDataService,    
              private storageService: SessionStorageService
              ) 

              {
                 this.stepperOrientation = breakpointObserver
                .observe('(min-width: 800px)')
                .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

              }
               

  

  ngOnInit(): void {
    this.dataServices = this.dataForm;
    this.createForm();      
    this.setUserCredential();

  }


  private createForm(): void {

    const formControls: { [key: string]: any } = {};

    for (const key in this.dataServices) {
      if (this.dataServices.hasOwnProperty(key)) {
        const controlData = this.dataServices[key];
        const validators = controlData.required ? [Validators.required] : [];
        formControls[key] = new FormControl(this.dataServices[key].value, validators);
      }
    }

    this.myForm = new FormGroup(formControls);
    this.keysServices = Object.keys(this.dataServices);   
    this.keyLength = this.keysServices.length;
    this.serviceGroups = this.grupoKeys(this.keysServices, 4);
    this.createFormControl(this.dataServices);

    for (const campo of this.keysServices) {
      this.myForm.addControl(
        campo.nombre,
        new FormControl(campo.valor, campo.requerido ? [Validators.required] : [])
      );
    }
  }

  createFormControl(controls: Record<string, formStepper>) {
    
    for (const controlKey of Object.keys(controls)) {
      const controlData = controls[controlKey];
      const validatorsToAdd = this.getValidatorsFromControlData(controlData.validators);  
      this.myForm.addControl(
        controlData.key,
        this.fb.control(controlData.value, validatorsToAdd)
      );
    }
  }
  
  private getValidatorsFromControlData(validatorData: any): ValidatorFn[] {
    const validatorsToAdd: ValidatorFn[] = [];
  
    if (validatorData) {
      for (const key of Object.keys(validatorData)) {
        const value = validatorData[key];
  
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'email':
            validatorsToAdd.push(Validators.email);
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            validatorsToAdd.push(Validators.nullValidator);
            break;
        }
      }
    }
  
    return validatorsToAdd;
  }
    
  grupoKeys(keys: string[], cantidad: number): string[][] {
    const grupos: string[][] = [];

    for (let i = 0; i < keys.length; i += cantidad) {
      grupos.push(keys.slice(i, i + cantidad));
    }

    return grupos;
  }
  
  recibirMensaje(mensaje: string) {
    this.mensajeDelHijo = mensaje;
  }

  validatorUser() {

    if (!this.user) {
      //localStorage.clear();
      //this.router.navigate(['/login']);    
      return;
    }
  
    try {
      const userObject = JSON.parse(this.user);
      this.user = userObject;
      this.email = userObject.email;
      this.reporter = userObject.idJIRA;
    
  
      if (userObject.idJIRA === null) { 
        //localStorage.clear();
        //this.router.navigate(['/login']);
      }
  
     
  
    } catch (error) {
      console.error('Error al analizar el objeto JSON:', error);
    }
  }
    
  enableButton() {
    this.disableButton = false;
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

  validateForm(){
    const credentialJson = localStorage.getItem('credentialGDR');
    if (credentialJson !== null) {
      this.myForm.value.userCredential = JSON.parse(credentialJson);
    } else {
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
  }

  setUserCredential(){
    const credentialJson = localStorage.getItem('credentialGDR');
    if (credentialJson !== null) {
      this.sharedState.userCredential = JSON.parse(credentialJson);
    } else {
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
  }
  
  sendForm(): void {
    this.openSpinner();
    
    if (!this.myForm.valid) {
      this.displaySnackbar('Por favor, complete los campos requeridos para enviar');
      return;
    }
  
    this.disableButton = true;
    const body = new FormData();
  
    if (this.sharedState.file) {
      body.append('myFile', this.sharedState.file.fileRaw, this.sharedState.file.fileName);
      delete this.sharedState.file;
    }
  
    this.sharedState['key'] = 'GDD';
    this.sharedState['type'] = 'Epic';
    body.append('myJson', JSON.stringify(this.sharedState));
    this.guardarEnLocalStorage(JSON.stringify(this.sharedState));
    this.ConnectionService.PostNewIssue(body).subscribe(
      (response) => {
        
        this.handleSuccessResponse(response);
        this.closeSpinner();
        this.borrarDatosDelSessionStorage('miRequerimiento');
      },
      (error) => {
        this.handleError(error);
        this.closeSpinner();
      }
    );
  }
  
  private handleSuccessResponse(response: any): void {
    this.dataEntry = Object.values(response);
    
    if (this.dataEntry[2] === '201') {
      this.receivedData = true;
      this.sharedDataService.setReceivedData(this.dataEntry);
      
      if (this.email === environment.credits) {
        this.infraAudio.play();
      } else {
        this.audio.play();
      }
      this.myForm.clearAsyncValidators();
    } else {
      this.receivedData = false;
      this.formError = true;
      this.handleError('Error en la respuesta del servidor');
    }
  }
  
  private handleError(error: any): void {
    this.receivedData = false;
    console.error(error);
    this.formError = true;
    this.displaySnackbar('Su requerimiento no pudo ser creado. Por favor, reenvíe el formulario');
    this.enableButton();
    
  }
  
  displaySnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public openSpinner(){
    this.loading = true;
  }

  public closeSpinner(){
    this.loading = false;
  }
  
  guardarEnLocalStorage(datos:any): void {
    // const datos = { nombre: 'Ejemplo', edad: 25 };  
    // Guardar en sessionStorage
    this.storageService.guardarEnSessionStorage('miRequerimiento', datos);
    
 
  }

  obtenerDelLocalStorage(clave: string){
    const datosObtenidos = this.storageService.obtenerDesdeSessionStorage(clave);   
    return datosObtenidos 
  }

  // Ejemplo de cómo borrar un objeto JSON de sessionStorage
  borrarDatosDelSessionStorage(clave: string): void {
    this.storageService.borrarDesdeSessionStorage(clave);
  }

}
