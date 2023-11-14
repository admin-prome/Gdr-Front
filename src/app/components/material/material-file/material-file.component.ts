import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueStepperCreateComponent } from '../../issue-stepper-create/issue-stepper-create.component';
import { fileTmb } from 'src/app/data/interfaces/formStepper-interface';

@Component({
  selector: 'app-material-file',
  templateUrl: './material-file.component.html',
  styleUrls: ['./material-file.component.css']
})
export class MaterialFileComponent implements OnInit {
  selectedFile: any;
  selectedFileName: any;
  fileTmb: fileTmb| undefined;
  snackBar: any;

  @Input() input: any;
  @Input() sharedState: any; // Objeto compartido  
  @Input() requestForm: any;
  @Output() onOpcionElegida = new EventEmitter<any>();
  @Output() mensajeEnviado = new EventEmitter<string>();
  
  fileName: string = '';
  myForm: FormGroup = this.fb.group({});
  valor: any;

  constructor(private stepper: IssueStepperCreateComponent, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.requestForm;
  }


  onFileSelected($event: any) {
    const file = $event.target.files[0];
    this.fileName = file.name;
    this.sharedState[this.input.key] = this.fileName;       

    if (file) {
      const maxSizeInBytes = this.input.maxFileSize * 1024 * 1024 * 1024; // 2 GB en bytes
      if (file.size <= maxSizeInBytes) {
        this.fileTmb = {
          fileRaw: file,
          fileName: file.name
        }

        this.selectedFile = file;
        this.selectedFileName = file ? file.name : '';    
        this.sharedState[this.input.key] = this.fileTmb; // Actualizar el objeto compartido
      
      } else {
        this.selectedFileName = '';
        this.displaySnackbar(`El archivo excede el tamaño máximo permitido (${this.input.maxFileSize} GB)`);   
      }
    }

  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append(this.input.key, this.selectedFile);
  }

  displaySnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  onInputChange(event: any) {
    this.valor = event.target.value;
  }

  onOpcionElegidaChange() {
    
    this.sharedState[this.input.key] = this.fileTmb;
    this.onOpcionElegida.emit(this.fileName);
  }



}
