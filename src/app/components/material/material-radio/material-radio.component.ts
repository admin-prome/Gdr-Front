import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { IssueStepperCreateComponent } from '../../issue-stepper-create/issue-stepper-create.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionItem, SubOption } from 'src/app/data/interfaces/formStepper-interface';


@Component({
  selector: 'app-material-radio',
  templateUrl: './material-radio.component.html',
  styleUrls: ['./material-radio.component.css']
})
export class MaterialRadioComponent implements OnInit {
 
  constructor(
              private stepper: IssueStepperCreateComponent,
              private fb: FormBuilder
              ) { }
  
  options: Array<any> = []
  select: any;
  json: any;
  optionsButtons: Array<string> =[];

  @Output() onOpcionElegida = new EventEmitter<any>();
  @Input() input: any;  
  @Input() sharedState: any; // Objeto compartido
  @Output() mensajeEnviado = new EventEmitter<string>();
  @Input() requestForm: any;

  myForm: FormGroup = this.fb.group({});
  valor: string = '';
  values!: SubOption[];
  ngOnInit(): void {
    this.myForm = this.requestForm;

    this.options =this.input.options;
    //console.log(this.options);
    this.values= Object.values(this.options); 
    this.optionsButtons = Object.keys(this.options);  
    // const formControlName = this.input.key;
    // this.myForm = this.fb.group({
    //   formControlName: "Si",
    // });

  }

  onInputChange(event: any) {
    this.valor = event.target.value;
  }

  onOpcionElegidaChange(selected: any) {
    
    this.sharedState[this.input.key] = selected; // Actualizar el objeto compartido
    //this.mensajeEnviado.emit(selected);
    //this.onOpcionElegida.emit(event.target.value);
    this.onOpcionElegida.emit(selected);
  }

}

