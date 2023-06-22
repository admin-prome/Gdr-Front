import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginJiraService {
 
  //private apiUrl = 'https://auth.atlassian.com/oauth/token';
  private apiUrl='https://auth.atlassian.com/authorize';
          //audience=api.atlassian.com
          //client_id=Zg1kfnn2umPy8NDHIkuF1pSbWwSUqSaL
          //scope=manage%3Ajira-configuration%20read%3Ajira-user%20manage%3Ajira-webhook%20write%3Ajira-work%20manage%3Ajira-project%20read%3Ajira-work%20manage%3Ajira-data-provider
          //redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fhome
          //state=${YOUR_USER_BOUND_VALUE}
          //response_type=code
          //prompt=consent'
  
  
          constructor(private http: HttpClient) { }

  public getToken(googleToken: string): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    const body = {
      audience:'api.atlassian.com',
      scope:'manage%3Ajira-configuration%20read%3Ajira-user%20manage%3Ajira-webhook%20write%3Ajira-work%20manage%3Ajira-project%20read%3Ajira-work%20manage%3Ajira-data-provider',
      state:googleToken,
      
      response_type:'code',
      prompt:'consent',
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      
      //redirect_uri: 'https://localhost:4200/home'
    };

    return this.http.post<any>(environment.baseUrlJiraAuth+'/authorize', body, { headers: headers });
  }

//   getJiraCode(){

//   redirectToExternalUrl(url: string): void {
//     const width = 800; // Ancho de la ventana
//     const height = 600; // Alto de la ventana
//     const left = (window.innerWidth - width) / 2; // Posición izquierda de la ventana centrada
//     const top = (window.innerHeight - height) / 2; // Posición superior de la ventana centrada

//     const options = `
//       width=${width},
//       height=${height},
//       left=${left},
//       top=${top},
//       resizable=yes,
//       scrollbars=yes
//     `;

//     window.open(url, '_blank', options);
//   }

// }


  }






