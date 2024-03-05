import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from 'src/app/services/userHandler/login/login.service';


declare var google: any;

import { userSession } from 'src/app/data/interfaces/userSession-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  pathTriangles = "../../../assets/triangulosback@4x.png";
  userData: userSession;
  googleAuth: boolean = false;
  backendAuth: boolean = false;
  loading: boolean = false;
  
  title: string = 'microsoft-login';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone
  ) {
    this.userData = {} as userSession;
    
  }

  
  ngOnInit(): void {

      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this)
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );
      google.accounts.id.prompt();
   
  }



  handleCredentialResponse(response: any): void {
    this.loading = true;
    if (response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      

      const responsePayload = JSON.parse(jsonPayload);
      this.userData.email = responsePayload.email;
      this.userData.name = responsePayload.name;
      this.userData.exp = responsePayload.exp;
      
      if(responsePayload.picture){
        this.userData.picture = responsePayload.picture;
      }
      else{
        this.userData.picture = 'https://requerimientos.prome.ar/assets/logoColorP.png'
      }      
     
      if (responsePayload.email_verified && responsePayload.hd === environment.domain) {
        this.googleAuth = true;
        
        if (this.googleAuth) {
          this.loginToBackend();
        }

      }
    }
  }


  loginToBackend(): void {

    this.loading=true;
    this.loginService.loginBack(this.userData).subscribe(
      (data: any) => {
        this.userData = { ...this.userData, ...data };
        localStorage.setItem('credentialGDR', JSON.stringify(this.userData));
        this.backendAuth = true;
       
        if (this.backendAuth && this.googleAuth) {
          this.ngZone.run(() => { // Envuelve la navegación con ngZone.run()
            this.loading = false;
            this.router.navigate(['/home']);
          });
        }
      },
      (error) => {
        
        console.log('Ocurrio un error al loguearse en el back:');
      }
    );
  }


}
