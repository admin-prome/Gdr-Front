import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  getCredential(){
    
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);    
      return userObject
    }
  }


  isAuthenticated() {    


    const userCredential = localStorage.getItem('credentialGDR');
   
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);

      if(userObject.idJIRA){
             
        return true; 
      }      
      localStorage.clear();   
    
      return false;
    }

    return false;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    return true;
  }

}