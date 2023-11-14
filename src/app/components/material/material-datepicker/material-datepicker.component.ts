import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { IssueStepperCreateComponent } from '../../issue-stepper-create/issue-stepper-create.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-material-datepicker',
  templateUrl: './material-datepicker.component.html',
  styleUrls: ['./material-datepicker.component.css']
})
export class MaterialDatepickerComponent implements OnInit {

  constructor(
                private stepper: IssueStepperCreateComponent,
                private fb: FormBuilder
              ) { }
              
  options: Array<any> = []
  selectedDate: Date | null = null;
  fecha: string = '';
  json: any;
  @Output() onOpcionElegida = new EventEmitter<any>();

  @Input() input: any;
  
  @Input() sharedState: any; // Objeto compartido
  @Output() mensajeEnviado = new EventEmitter<string>();
  @Input() requestForm: any;
  myForm: FormGroup = this.fb.group({});



  valor: string = '';
  ngOnInit(): void {
    this.myForm = this.requestForm;
    this.options =this.input.options;

  }


  onDateChange(event: any) {
    this.selectedDate = event.value;
  }

  onInputChange(event: any) {
    this.valor = event.target.value;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const formattedDate = event.value.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
  
      this.fecha = formattedDate;
      this.onOpcionElegidaChange(this.fecha);
  
      this.selectedDate = event.value;
    } else {
      // Manejar el caso en que event.value es nulo
      this.fecha = (`${type}: Fecha no válida`);
      this.selectedDate = null;
    
  }
}

  onOpcionElegidaChange(selected: any) {
    
    this.sharedState[this.input.key] = selected; // Actualizar el objeto compartido
    //this.mensajeEnviado.emit(selected);
    //this.onOpcionElegida.emit(event.target.value);
    this.onOpcionElegida.emit(selected);

  }

}
