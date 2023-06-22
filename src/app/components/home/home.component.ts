import { Component, Input, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../services/api-connection-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() inputValue: any;
  public credentialObj = {};

  constructor(private ConnectionService: ApiConnectionService) {}

  ngOnInit(): void {
    // let token = localStorage.getItem('token') as string;
    // const userCredential = localStorage.getItem('userCredentialGDR');
    // this.credentialObj = this.decodeJWT(token);
    // console.log('mi objeto credential', this.credentialObj)    
    console.log('-----------ESTO ES EL HOME ----------')
    
    // const responsePayload = JSON.parse(jsonPayload);  
    //sessionStorage.setItem("googleCredential", JSON.stringify(userCredential));
    
    //console.log(userCredential)
    // document.location.href = "home";

    console.log('-----------ESTO ES EL HOME ----------')
  }

  // private decodeJWT(token: string):any{
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
  //   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //   console.log('-----------ESTO ES EL HOME ----------')
  //   console.log(JSON.parse(jsonPayload));
  //   const responsePayload = JSON.parse(jsonPayload);  
  //   sessionStorage.setItem("googleCredential", JSON.stringify(responsePayload));


  //   console.log(responsePayload.given_name)
  //   // document.location.href = "home";

  //   console.log('-----------ESTO ES EL HOME ----------')

  //   return JSON.parse(jsonPayload);
  // }
}
