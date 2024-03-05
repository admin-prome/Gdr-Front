import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amount-million',
  templateUrl: './amount-million.component.html',
  styleUrls: ['./amount-million.component.css']
})
export class AmountMillionComponent implements OnInit {
  @Input() dataEntry: any;
  formError: any;
  receivedData: any;
  loading: any;
  requestForm: FormGroup;
  http: any;
  userEmail: any;

  constructor(private fb: FormBuilder,
              private ConnectionService: ApiConnectionService,) {
    this.requestForm = this.fb.group({
      dni: ['', Validators.required],
      opportunity: ['', Validators.required],
      //executive: ['', Validators.required],
      quotaValue: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]], // Assuming quotaValue should be a positive integer
      amount: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]], // Assuming amount should be a positive integer
      //notified: [false] // Assuming notified should be a boolean, initialize with default value
    });
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
          this.formError = error;
          this.loading = false;
        }
      );
    }
  }

  sendForm(){

    const CreditData = {
      dni: this.requestForm.get('dni')?.value,
      opportunity: this.requestForm.get('opportunity')?.value,
      executive: this.userEmail,
      quotaValue: this.requestForm.get('quotaValue')?.value,
      amount: this.requestForm.get('amount')?.value,
      notified: 0
    };

    this.ConnectionService.PostNewHigherAmount(CreditData).subscribe(
      (response) => {
        console.log(response);
        this.receivedData = response;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.formError = error;
        this.loading = false;
      });
  }


  ngOnInit(): void {
    this.userEmail = this.getCredential().email;
    console.log(this.userEmail)
  }


  getCredential() {
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);
     
      return userObject;
      
    }
  }
}
