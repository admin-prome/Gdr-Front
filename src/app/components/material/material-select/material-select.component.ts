import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { IssueStepperCreateComponent } from '../../issue-stepper-create/issue-stepper-create.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.css'],

})
export class MaterialSelectComponent implements OnInit {

  selected: any;
  options: Array<any> = []
  select: number | string = 0;
  json: any;
  steps: any;

  indiceI: number = 0;
  indiceJ: number = 0;
  opcionesArray: any;

  @Input() input: any;
  @Input() sharedState: any; // Objeto compartido

  @Output() onOpcionElegida = new EventEmitter<any>();
  @Output() mensajeEnviado = new EventEmitter<string>();
  @Input() requestForm: any;
  myForm: FormGroup = this.fb.group({});


  constructor(private stepper: IssueStepperCreateComponent, private fb: FormBuilder) { }

  ngOnInit(): void {
    //this.requestForm = this.re
    this.myForm = this.requestForm;
    this.steps = this.stepper.dataServices;
    this.options = this.input.options;
    this.opcionesArray = Object.values(this.options);
    this.selected = null; // Agrega esta línea para inicializar selected3
  }



  getSeleccion(seleccion: any) {
  }

  getDependientes() {
    if (this.input.dependents) {
      return this.input.dependents;
    }
    return false;
  }

  getDependentOn() {
    if (this.input.dependentOn) {
      return this.input.dependentOn;
    }
    return false;
  }

  getKey() {
    return this.input.key;
  }

  getSharedState() {
    const valor = this.sharedState;

  }

  getOpcionElegidaEnElementoPadre(keyPadre: string) {

    if (this.sharedState[keyPadre]) {
      return this.sharedState.keyPadre;
    }
    else {
      return false;
    }




  }

  getOpciones(key: string) {
    const opcionElegidaPorUsuario = this.getOpcionElegidaEnElementoPadre(this.getDependentOn())

    if (this.sharedState[key]) {

      return this.stepper.dataServices[key];
    }

    return false;
    // this.stepper.dataServices[key];




  }

  actualizardependenciasII() {
    for (let i = 0; i < this.input.dependents.length; i++) {
      const dependentKey = this.input.dependents[i];
      const parentComponent = this.steps.find((step: { key: any; }) => step.key === dependentKey);

      if (parentComponent) {
        // Encuentra el componente padre
        const parentValue = this.sharedState[parentComponent.key];

        // Verifica si el componente padre tiene dependencias
        if (parentComponent.dependencies && parentValue) {
          this.options = parentComponent.dependencies[parentValue];
        }
      }
    }
  }

  guardarEnEstadoCompartido() {
    if (this.input.return === 'json') {


      // Almacena el objeto completo en el sharedState.
      this.sharedState[this.getKey()] = this.selected;
    }

    else {
      // Almacena solo el valor en el sharedState.

      this.sharedState[this.getKey()] = this.selected.value;
    }

    this.onOpcionElegida.emit(this.selected);

  }

  actualizardependencias() {


    if (this.input.return === 'json') {


      // Almacena el objeto completo en el sharedState.
      this.sharedState[this.getKey()] = this.selected;
    }

    else {
      // Almacena solo el valor en el sharedState.

      this.sharedState[this.getKey()] = this.selected.value;
    }

    this.onOpcionElegida.emit(this.selected);




  }



  onOpcionElegidaChange(selected: any) {



    this.getSeleccion(selected);
    this.getSharedState();
    this.getOpcionElegidaEnElementoPadre(this.getDependentOn());
    this.getOpciones(this.getDependentOn());


    //verifico si algun componente depende de mi valor 
    if (this.getDependientes()) {
      //debo buscar los componentes dependientes y actualizarles las opciones para mostrar

      this.select = selected;



    }

    //this.actualizardependencias();
    this.guardarEnEstadoCompartido();

    if (this.input.dependencies) {

      // Obtén el valor de la dependencia en sharedState
      const dependencyValue = this.sharedState[this.input.dependencies];

      // Verifica si la opción actual depende de la opción anterior
      if (dependencyValue === this.input.dependencyValue) {
        // Actualiza las opciones en base a la dependencia
        this.options = this.input.options;
        //this.stepper.jsonData[this.indiceJ].options = this.stepper.jsonData[this.indiceJ].dependecies[this.sharedState[this.stepper.jsonData[this.indiceI].key]]

      }

      else {
        // Restablece las opciones si no se cumple la dependencia
        this.options = [];
      }

    }
    this.getSeleccion(selected);
  }

}
