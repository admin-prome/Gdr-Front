import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { LoginService } from 'src/app/services/userHandler/login/login.service';

declare var google: any;

import { EncryptionServiceService } from '../../services/EncryptionService/encryption-service.service';
import { LoginJiraService } from 'src/app/services/userHandler/loginJira/login-jira.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit, AfterViewInit {

  pathTriangles = "../../assets/triangulosbackII@4x.png";
  
    
  constructor(private router: Router,
              private encryptionService: EncryptionServiceService,
              private loginService: LoginService,
              private loginJiraService: LoginJiraService) { }

  ngAfterViewInit(): void {
    const userCredential = localStorage.getItem('userCredentialGDR');
    if(userCredential){
       this.router.navigate(['/home']);
    }
    else{
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
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
    console.log('--------------------------------');
    
    console.log('--------------------------------');
    if(response.credential){      
      
    
      var base64Url = response.credential.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const responsePayload = JSON.parse(jsonPayload);
      
      sessionStorage.setItem('PayloadGDRBack', JSON.stringify(responsePayload));
      
      
      if (responsePayload.email_verified){
       
        if(responsePayload.hd === environment.domain){
             
          const userData = {            
            "email": responsePayload.email,
            "name": responsePayload.name,
            "picture": responsePayload.picture,
            "exp": responsePayload.exp,
            "credential": response.credential
          };
          const userDataJson = userData;
          
         
          localStorage.setItem("userCredentialGDR",JSON.stringify(userDataJson));
          
          this.router.navigate(['/home']);
        
        }
        else{
          
          this.router.navigate(['/login']);
        }

      }
      else{
        this.router.navigate(['/login']);
      }

      
      // this.router.navigate(['/home']);
      // sessionStorage.setItem("username", responsePayload.given_name);
      // localStorage.setItem("userCredentialGDR",JSON.stringify(responsePayload));
      // sessionStorage.setItem("userCredentialGDR",JSON.stringify(responsePayload));
      // Encriptar los datos utilizando una clave secreta
      // localStorage.setItem("userCredentialGDREncrypt",JSON.stringify(responsePayload));           
      
      document.location.href = "home";      
      this.router.navigate(['/home']);
      // sessionStorage.setItem('token',response.credential);
   }
  }

  loginBackend(credential: any): any{
    const response = this.loginService.loginBack(credential);
    response.subscribe(
      (data) => {
       
        sessionStorage.setItem('CredentialJira', JSON.stringify(data));
        localStorage.setItem('CredentialJira', JSON.stringify(data));
    },
    (error) => {
      console.log('Ocurrio un error al loguearse en el back :',error);
    }
      
    );
  }

  getToken(credentialUser: any) {
    this.loginJiraService.getToken(credentialUser)
      .subscribe(
        (data: any) => {
          // console.log(data);
          // Aquí puedes realizar acciones adicionales con la respuesta exitosa
        },
        (error: any) => {
          // console.error(error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades
        }
      );
  }
  

}
