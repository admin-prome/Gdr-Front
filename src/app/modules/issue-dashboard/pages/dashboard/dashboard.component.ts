import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { IssuesServicesService } from 'src/app/services/issue-dashboard/issues-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  
  userCredential: any;
  orderedForm: any;
  panelOpenState = false;
  issueData: any[] = [];  // Asegúrate de que issueData esté inicializado como un array vacío.
  management: string = '';

  constructor(
            private issueService: IssuesServicesService,
            private authServices: AuthService,
            private router: Router
            ) { }

  ngOnInit(): void {

    this.userCredential = this.authServices.getCredential();
    this.management = this.userCredential.userDetails.management;
   
  
    const payload = {      
      "email": this.userCredential.email,
      "maxResult": 40
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


  public convertirFormatoFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
  
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
  
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
  
    let zonaHoraria = 'GMT-03 Bs. As.';
    const match = fecha.toString().match(/([-\+][0-9]+)\s/);
    if (match) {
      zonaHoraria = match[1] === '-0300' ? 'GMT-03 Bs. As.' : match[1];
    }
  
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos} Hs ${zonaHoraria}`;
    }
    

    normalizarDescripcion(jsonData: string): string {
      // Convierte la cadena JSON a un objeto de JavaScript
      const data = JSON.parse(jsonData);
      
      // Inicializa una lista para almacenar las líneas de texto
      const lineas = [];
  
      // Itera a través del contenido del campo "description"
      for (const item of data.content) {
        if (item.type === 'paragraph') {
          // Procesa el contenido del párrafo
          let parrafo = '';
          for (const fragmento of item.content) {
            if (fragmento.type === 'text') {
              parrafo += fragmento.text;
            } else if (fragmento.type === 'hardBreak') {
              parrafo += '\n';
            }
          }
          lineas.push(parrafo);
        }
      }
  
      // Une las líneas en un solo texto
      return lineas.join('\n');
    }

    extraerInformacion(input: string): { [key: string]: string } {
      const regex = /([^:\n]+):\s*([^:\n]+)/g;
      const matches = input.matchAll(regex);
      const resultado: { [key: string]: string } = {};
    
      for (const match of matches) {
        const etiqueta = match[1].trim();
        const valor = match[2].trim();
        resultado[etiqueta] = valor;
      }
    
      return resultado;
    }
    
    extraerInformacionConSaltos(input: string): { [key: string]: string } {
      const regex = /([^:\n]+):\s*([^:\n]+)/g;
      const matches = input.matchAll(regex);
      const resultado: { [key: string]: string } = {};
    
      for (const match of matches) {
        const etiqueta = match[1].trim();
        const valor = match[2].trim();
        resultado[etiqueta] = valor;
      }
    
      return resultado;
      
    }

    mostrarConSaltosDeLinea(cadena: string): string {
      // Reemplaza los saltos de línea con la etiqueta <br> para el formato HTML
      return cadena.replace(/\n/g, '<br>');
    }
  }


