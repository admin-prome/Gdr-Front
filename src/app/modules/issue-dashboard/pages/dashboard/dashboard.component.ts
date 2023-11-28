import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { IssuesServicesService } from 'src/app/services/issue-dashboard/issues-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userCredential: any;
  orderedForm: any;
  panelOpenState = false;
  issueData: any[] = [];  // Asegúrate de que issueData esté inicializado como un array vacío.


  constructor(
            private issueService: IssuesServicesService,
            private authServices: AuthService,
            private router: Router
            ) { }

  ngOnInit(): void {

    this.userCredential = this.authServices.getCredential();
    
  
    const payload = {      
      "email": this.userCredential.email,
      "maxResult": 10
    }
    
    this.getIssueData(payload);

  }

  getIssueData(userData: any) {
    this.issueService.getDataIssues(userData).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);

        this.issueData = response
        
        
       
      },

      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Maneja errores si es necesario
        this.issueData = [];
      }
    );
    
  }

  navigateTo(site: string){
    this.router.navigate([site]);
  }

  }


