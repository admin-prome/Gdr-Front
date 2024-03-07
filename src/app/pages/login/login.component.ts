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
  error: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone
  ) {
    this.userData = {} as userSession;
    
  }

  
  ngOnInit(): void {

    this.redirectToExternalUrl();
      // google.accounts.id.initialize({
      //   client_id: environment.googleClientId,
      //   callback: this.handleCredentialResponse.bind(this)
      // });
      // google.accounts.id.renderButton(
      //   document.getElementById("buttonDiv"),
      //   { theme: "outline", size: "large" }
      // );
      // google.accounts.id.prompt();
   
  }

  redirectToExternalUrl() {
    const url = 'https://gdr-front-prod.azurewebsites.net/home';
    
    // Verifica si la URL contiene "requerimientos.prome.ar"
    if (window.location.href.includes('requerimientos.prome.ar')) {
      window.location.href = url; // Esta línea puede ser necesaria para abrir la URL en una nueva ventana/tab
      // O puedes usar el enfoque de Router
      // this.router.navigateByUrl(url);
    } 
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
       
        if (this.backendAuth) {
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

  public async getSession() {
    try {
        this.loading = true;
        // Make a GET request to the /.auth/me endpoint
        const response = await fetch(environment.azureURL+".auth/me",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },        
          });
        if (response.ok) {
            // Parse the JSON response
            const userData = await response.json();
            
            const userClaims = userData[0].user_claims;
           
            
            const emailClaim = userClaims.find((claim: { typ: string; }) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            const nameClaim = userClaims.find((claim: { typ: string; }) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            const expClaim = userClaims.find((claim: { typ: string; }) => claim.typ === "exp");
            // const pictureClaim = userClaims.find((claim: { typ: string; }) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn" || claim.typ === "http://schemas.microsoft.com/identity/claims/objectidentifier");

            
            if (emailClaim) {              
              
              if (emailClaim.val.endsWith(".com.ar")){
                this.userData.email = emailClaim.val.slice(0, -3);}
              else{
                this.userData.email = emailClaim.val;
              }

              if (nameClaim) {
                  this.userData.name = nameClaim.val;
              } else {
                  this.userData.name = '';
              }

              if (expClaim) {
                  this.userData.exp = expClaim.val;
              } else {
                  this.userData.exp = '';
              }

            //  if (pictureClaim) {
            //       this.userData.picture = pictureClaim.val;
            //   } else {
            //       this.userData.picture = 'https://requerimientos.prome.ar/assets/logoColorP.png';
            //   }
 
              this.loginToBackend();
              this.loading = false;
               

            } else {
                console.error("Email address claim not found in response.");
                this.loading = false;
                this.error = true;
            }
        } else {
            console.error(`Failed to fetch email address: ${response.status} ${response.statusText}`);
            this.loading = false;
            this.error = true;
        }
    } catch (error) {
     
        console.error("Error fetching email address:", error);
        this.loading = false;
        this.error = true;
        
    }
}
}
