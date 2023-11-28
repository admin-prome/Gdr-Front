import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesServicesService {

  private backendUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDataIssues(userData: any) {
    const headers = new HttpHeaders({
      'Authorization-Key': environment.AuthorizationKey,
      'Content-Type': 'application/json; charset=utf-8'      
    });
    const url = this.backendUrl+'getissuesforuser'
   
    return this.http.post<any>(url, userData, { headers: headers });
  }
  
}
