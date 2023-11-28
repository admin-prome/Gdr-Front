import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formStepper } from 'src/app/data/interfaces/formStepper-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetFormsService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postFormData(formData: any) {
    const headers = new HttpHeaders({
      'Authorization-Key': environment.AuthorizationKey,
      'Content-Type': 'application/json; charset=utf-8'      
    });
    const url = this.backendUrl+'GetForm'
   
    return this.http.post<any>(url, formData, { headers: headers });
  }
  

  

}
