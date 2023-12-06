import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderedForm } from 'src/app/data/interfaces/formStepper-interface';
import { DataForm } from 'src/app/data/models/issue-create-form.models';
import { AuthService } from 'src/app/services/auth-service';
import { GetFormsService } from 'src/app/services/forms/getForms.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
  
  
  traditional: any = null;
  //traditional: any = { order: {}, form: {} };
  orderedForm: OrderedForm = {}; // Definimos el tipo de inte
  userCredential: any;

  constructor( private getFormsService: GetFormsService,
               private authServices: AuthService,
               private router: Router) { }

  ngOnInit(): void {


    this.userCredential = this.authServices.getCredential();
    
  
    const payload = {
      "formId": "traditional",
      "email": this.userCredential.email,
      "userCredential": this.userCredential
    }
    //console.log(this.traditional);
    //this.onFormSubmit(payload);
    //console.log(this.traditional);
    this.onFormSubmit(payload);
    //this.traditional= this.getFormsService.traditional;
  }

  onFormSubmit(formData: any) {
    this.getFormsService.postFormData(formData).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response.formData);
        console.log('Respuesta del backend:', response.formData.order);

       
        //const order = response.formData.order;
        const jsonData = response.formData.form;

        // Obtén el objeto "order" del JSON
        const order = response.formData.order;

        // Crea un nuevo objeto JSON ordenado de acuerdo a la propiedad "order"
        
        for (const key in order) {
          console.log(key);
          if (order.hasOwnProperty(key)) {

            const fieldName = order[key];
            // console.log(fieldName);
            // console.log(jsonData[fieldName])
            if (jsonData[fieldName]) {
              this.orderedForm[fieldName] = jsonData[fieldName];
            }
          }
        }
        console.log('..........................')
        //console.log(this.orderedForm)
        this.traditional=  this.orderedForm;
      },

      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Maneja errores si es necesario
      }
    );
    
  }

  navigateTo(site: string){
    this.router.navigate([site]);
  }




}
