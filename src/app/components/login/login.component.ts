import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
declare var google: any;

import { EncryptionServiceService } from '../../services/EncryptionService/encryption-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit, AfterViewInit {

  pathTriangles = "../../assets/triangulosbackII@4x.png";
  // userCredential = localStorage.getItem('userCredentialGDREncrypted');
  
  constructor(private router: Router,
              private encryptionService: EncryptionServiceService) { }

  ngAfterViewInit(): void {
    // const userCredential = localStorage.getItem('userCredentialGDR');
    if(localStorage.getItem('userCredentialGDR')){
      const userCredential = localStorage.getItem('userCredentialGDR');
      console.log('Se encontro un usuario en localStorage');
      console.log('este es el usuario en el localStorage ',userCredential);
      
      this.router.navigate(['/home']);
    }
    else{
      google.accounts.id.initialize({
        client_id: "688079392079-bpsjl4kmg4vuqik4562slb4ni6o9netb.apps.googleusercontent.com",
        callback: this.handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
      }
      
  }

  ngOnInit(): void {


  }

  handleCredentialResponse = (response: any) => {
    console.log(response.credential);
    if(response.credential){
      var base64Url = response.credential.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const responsePayload = JSON.parse(jsonPayload)
      console.log('Esto es el login')
      console.log(responsePayload.name)
      if (responsePayload.email_verified){
        console.log('El correo ha sido verificado');
        if(responsePayload.hd === environment.domain){
          console.log('El dominio del usuario ha sido verificado');          
          const userData = {            
            "email": responsePayload.email,
            "name": responsePayload.name,
            "picture": responsePayload.picture,
            "exp": responsePayload.exp
          };
          const userDataJson = userData;
          console.log('userDataJson: ', userDataJson);
          const userDataText = userDataJson.toString();
          console.log('userDataText: ', userDataText);
          
          // const encryptedData = CryptoJS.AES.encrypt(userDataJson, environment.key).toString();
          
          const encryptedData = this.encryptionService.encryptData(userDataText);
          localStorage.setItem("userCredentialGDR",JSON.stringify(userDataJson));
          console.log('Esto es la data encriptada: ',encryptedData);
          // this.router.navigate(['/home']);
        }
        else{
          console.log('El dominio no ha sido verificado');
        }

      }
      else{
        console.log('El correo no ha sido verificado');
      }
      this.router.navigate(['/home']);
      // sessionStorage.setItem("username", responsePayload.given_name);
      // localStorage.setItem("userCredentialGDR",JSON.stringify(responsePayload));
      // sessionStorage.setItem("userCredentialGDR",JSON.stringify(responsePayload));
      // Encriptar los datos utilizando una clave secreta
      // localStorage.setItem("userCredentialGDREncrypt",JSON.stringify(responsePayload));           
      
      // document.location.href = "home";      
      // this.router.navigate(['/home']);
      // sessionStorage.setItem('token',response.credential);
   }
  }

}
