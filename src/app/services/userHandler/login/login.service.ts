import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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

public loginBack(userCredential: any): Observable<any> { 
  const response =  this.http.post<any>(this.urlApi + 'user/login', userCredential);
  response.subscribe(
    (data) => {
      console.log("Usted se ha logueado correctamente en el back")  
      console.log(data);
      sessionStorage.setItem('ResponseGDRLoginBack', JSON.stringify(data));
    },
    (error) => {
        console.log('Ocurrio un error al loguearse en el back')
        console.log(error);
    }
);

  return response;

}
}
