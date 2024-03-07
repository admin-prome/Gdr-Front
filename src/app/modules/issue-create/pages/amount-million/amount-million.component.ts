import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-amount-million',
  templateUrl: './amount-million.component.html',
  styleUrls: ['./amount-million.component.css']
})
export class AmountMillionComponent implements OnInit {
  @Input() dataEntry: any;
  formError: boolean =  false;
  receivedData: boolean =false;
  loading: boolean = false;
  requestForm: FormGroup;
  http: any;
  userEmail: any;
  sending: boolean = false;
  creditCourse: string[] = ["Prome 0.4", "BIP"]

  constructor(private fb: FormBuilder,
              private ConnectionService: ApiConnectionService,
              private router: Router,
              ) {
    
  this.requestForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), this.maxLengthValidator(10)]],
    opportunity: ['', [Validators.required, Validators.maxLength(7)]],
    quotaValue: ['', [Validators.required, this.maxLengthValidator(9)]],
    amount: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), this.maxLengthValidator(12)]],
    creditCourse: ['', Validators.required],
    validateCourse: ['', [Validators.required, Validators.requiredTrue]],
      //notified: [false] // Assuming notified should be a boolean, initialize with default value
    });
  }


  maxLengthValidator(max: number) {
    return (control: { value: string }) => {
      return control.value && control.value.toString().length > max ? { maxLength: true } : null;
    };
  }

  sendForm2() {
    if (this.requestForm.valid) {
      // Convert the form values to the desired JSON format
      const formData = {
        dni: this.requestForm.get('dni')?.value,
        opportunity: this.requestForm.get('opportunity')?.value,
        executive: this.userEmail,
        quotaValue: this.requestForm.get('quotaValue')?.value,
        amount: this.requestForm.get('amount')?.value,
        //notified: this.requestForm.get('notified')?.value ? 1 : 0
      };

      // Now you can send the formData to your backend
      // For example, using Angular's HttpClient
      // Make sure to replace the API_URL with your actual backend API endpoint
      const API_URL = environment.baseUrl+'cuota-mayor';
      this.loading = true;
      console.log(API_URL)
      // Assuming you have HttpClient imported and injected in your component
      // Import it using: import { HttpClient } from '@angular/common/http';
      // And inject it in the constructor: private http: HttpClient
      this.http.post(API_URL, formData).subscribe(
        (response: any) => {
          // Handle successful response from the backend
          this.receivedData = response;
          this.loading = false;
        },
        (error: any) => {
          // Handle error response from the backend
          this.formError = true;
          this.loading = false;
        }
      );
    }
  }

  sendForm(){
      this.loading = true;
    const CreditData = {
      dni: this.requestForm.get('dni')?.value,
      opportunity: this.requestForm.get('opportunity')?.value,
      executive: this.userEmail,
      quotaValue: this.requestForm.get('quotaValue')?.value,
      amount: this.requestForm.get('amount')?.value,
      creditCourse: this.requestForm.get('creditCourse')?.value,
      notified: 0
    };

    this.ConnectionService.PostNewHigherAmount(CreditData).subscribe(
      (response) => {
        this.receivedData = true;
        this.loading = false;
        this.sending = false;
        this.formError = false;
      },
      (error) => {
        this.receivedData= false;
        this.formError = true;
        this.loading = false;
        this.sending = false;
      });
  }


  ngOnInit(): void {

    const userEmailFromCredentials = this.getCredential().email;
    this.userEmail = userEmailFromCredentials ? userEmailFromCredentials : 'No se pudo obtener el correo electrónico';
     
  }


  getCredential() {
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);
     
      return userObject;
      
    }
  }

  navigateTo(site: string){
    this.router.navigate([site]);
  }

  newIssue(){
    this.formError = false;
    this.loading = false;
    this.receivedData = false
  }

  refreshPage(): void {
    window.location.reload();
  }


}
