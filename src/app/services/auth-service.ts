import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isAuthenticated() {    
    if(localStorage.getItem("userCredentialGDR")){
      return true;
    }
    if (localStorage.getItem("userCredentialGDREncrypted")){
      
      console.log('El servicio ha autenticado su credencial encriptada');


      return true
    }
    return false;
  }

  logout() {
    return sessionStorage.setItem("userCredentialGDR", '');
    // return localStorage.removeItem('username');
  }

}