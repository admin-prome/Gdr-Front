import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { IssueStepperCreateComponent } from '../../issue-stepper-create/issue-stepper-create.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-material-textarea',
  templateUrl: './material-textarea.component.html',
  styleUrls: ['./material-textarea.component.css']
})
export class MaterialTextareaComponent implements OnInit {
  constructor(
                private stepper: IssueStepperCreateComponent, 
                private fb: FormBuilder
                ) { }

  @Output() onOpcionElegida = new EventEmitter<any>();

  @Input() input: any;
  
  @Input() sharedState: any; // Objeto compartido
  @Output() mensajeEnviado = new EventEmitter<string>();
  @Input() requestForm: any;
  myForm: FormGroup = this.fb.group({});


  valor: string = '';
  ngOnInit(): void {
    this.myForm = this.requestForm;

  }

  onInputChange(event: any) {
    this.valor = event.target.value;
  }


  onOpcionElegidaChange(event: any) {
   this.sharedState[this.input.key] = event.target.value; // Actualizar el objeto compartido
    //this.mensajeEnviado.emit(selected);
    this.onOpcionElegida.emit(event.target.value);
  }

}
