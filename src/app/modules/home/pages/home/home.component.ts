import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userSession } from 'src/app/data/interfaces/userSession-interface';
import { LoginService } from 'src/app/services/userHandler/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
  userData: userSession;
  backendAuth: boolean = false;
  userEmail: any;
  constructor(  
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone
    ) {
      this.userData = {} as userSession;
     }

  optionCards: any[] = []
  matriz: any[] = [
    {
      'url': '../issue-create',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/traditionalForm.png',
      'titulo': 'Formulario Tradicional',
      'icon': 'add_circle',
      'descripcion': 'Experimente la familiaridad del formulario clásico que ha estado utilizando en esta sección, vigente hasta el 01/02/2024',
      'color':'279D2E'
      },
      {
      'url': '../issue-create/new-issue',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/newForm.png',
      'titulo': 'Nuevo Formulario',
      'icon': 'add_task',
      'descripcion': 'Descubra todo el potencial de esta herramienta mediante nuestro nuevo formulario, diseñado para ofrecer una experiencia mejorada.',
      'color':'25B4BD'
      },
      {
      'url': '../help',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/help.png',
      'titulo': 'Ayuda',
      'icon': 'question_mark',
      'descripcion': 'Acceda a toda la información necesaria para aprender a realizar su primera carga. Consulte nuestra sección de ayuda para obtener orientación detallada.',
      'color':'0360AA'
    },
      {
        'url': '../dashboard',
        'id': 'Cuenta_cdni_comercios_referidos',
        'imagenSrc': '../../../../../assets/cardImgs/help.png',
        'titulo': 'Mi Tablero',
        'icon': 'dashboard',
        'descripcion': 'Acceda a toda la información de los estados de sus requerimientos e incidentes cargados.',
        'color':'59358B'
        }
  ];
  sucursal: any[] = [
    {
      'url': '../nuevo-incidente/cuota-mayor',
      'id': 'Cuenta_cdni_comercios_referidos',
      'imagenSrc': '../../../../../assets/cardImgs/feeAmount.png',
      'titulo': 'Créditos con cuota mayor a 1 Millón',
      'icon': 'paid',
      'descripcion': 'Registre las solicitudes cuyo monto de cuota sean mayores 1 Millon de pesos',
      'color':'aa1840'
      },
      {
        'url': '../help',
        'id': 'Cuenta_cdni_comercios_referidos',
        'imagenSrc': '../../../../../assets/cardImgs/help.png',
        'titulo': 'Ayuda',
        'icon': 'question_mark',
        'descripcion': 'Acceda a toda la información necesaria para aprender a realizar su primera carga. Consulte nuestra sección de ayuda para obtener orientación detallada.',
        'color':'0360AA'
      },
  ]
  branch: string = ''
  ngOnInit(): void {

    this.userEmail =  this.getCredential() ;

    this.branch = this.getCredential();
    if (this.branch != 'Zona Casa Matriz') {
      this.optionCards = this.sucursal;
    }
    else{
      this.optionCards = this.matriz;
    }
  }

  getCredential() {
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);
      return userObject.userDetails.branch_zone;
      
    }
  }

  
  public async getEmailAdress() {
    try {
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
            const pictureClaim = userClaims.find((claim: { typ: string; }) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn" || claim.typ === "http://schemas.microsoft.com/identity/claims/objectidentifier");

            
            if (emailClaim) {
              this.userData.email = emailClaim.val;

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

              if (pictureClaim) {
                  this.userData.picture = pictureClaim.val;
              } else {
                  this.userData.picture = 'https://requerimientos.prome.ar/assets/logoColorP.png';
              }

              this.loginToBackend();
                return emailClaim.val;

            } else {
                console.error("Email address claim not found in response.");
                return null;
            }
        } else {
            console.error(`Failed to fetch email address: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching email address:", error);
        return null;
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
        this.loading = false;     
      }
    },
    (error) => {
      
      console.log('Ocurrio un error al loguearse en el back:');
    }
  );
}
  
}
