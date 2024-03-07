import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { userSession } from 'src/app/data/interfaces/userSession-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlApi = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  public loginBack(userCredential: userSession): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization-Key': environment.AuthorizationKey,
      'Content-Type': 'application/json; charset=utf-8'      
    });
    
    const url = this.urlApi + 'users/getsession'; // Cambio en la URL
    return this.http.post<any>(url, userCredential, { headers }); // Cambio a POST
    
  }
}
