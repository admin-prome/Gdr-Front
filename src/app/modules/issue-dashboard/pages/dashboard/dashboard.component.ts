import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit,  Renderer2 } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { IssuesServicesService } from 'src/app/services/issue-dashboard/issues-services.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { userSession } from 'src/app/data/interfaces/userSession-interface';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import html2canvas from 'html2canvas';
import { Color, ScaleType } from '@swimlane/ngx-charts';

export interface UserIssueData{
  id: string;
  summary: string;
  internal_identifier: string;
  approver: string;
  assignee: string;
  created: string;
  key: string;
  last_updated: string;
  responsible: string;
  status: string;
  priority: string;
  description: string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  standartColumns: string[] = [ 'internal_identifier','summary', 'status','priority', 'last_updated', 'created','assignee','description'];
  fullColumns: string[] = [ 'internal_identifier','summary','id', 'status','priority', 'last_updated', 'created', 'key', 'assignee','description']; 
  displayedColumns: string[] = this.standartColumns;
  dataSource: MatTableDataSource<UserIssueData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('modalContent', { static: false })
  modalContent!: ElementRef;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  colorSlide: string = '#fff'
  isCheckedFullInfo = false;  
  orderedForm: any;
  panelOpenState = false;
  issueData: UserIssueData[] = [];  // Asegúrate de que issueData esté inicializado como un array vacío. 
  userCredential: any;
  management: string = '';
  userType: string = '';
  loading: boolean = true;
  dataError: boolean = false;
  payload: any;
  botonDesactivado: boolean = false;
  selectedDescription: string | undefined;
  selectedRow: any | undefined;
  tecno: boolean = false;
  someValue: string = '';
  imgcreada: boolean = false;
  imagenCreada: any;
  
  
  view: [number,number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];


 

  constructor(
            private issueService: IssuesServicesService,
            private authServices: AuthService,
            private router: Router,
            private changeDetectorRef: ChangeDetectorRef,
            private storageService: SessionStorageService,
            private ngZone: NgZone
            )
            {
                this.dataSource = new MatTableDataSource(this.issueData);
            }


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngAfterViewInit() {
    
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  modalShown(): void {
    // Esta función se ejecutará cuando el modal esté completamente visible
    // Puedes llamar a descargarComoImagen() aquí para asegurarte de que el modalContent esté inicializado.

  }

  crearImagen() {
    // Buscar el elemento con el id "contenido"
    const contenidoElement = document.querySelector<HTMLElement>("#contenido");
  
    if (contenidoElement) {
      // El elemento fue encontrado, proceder con html2canvas
      html2canvas(contenidoElement, {
        ignoreElements: (element: Element) => {
          // Devolver true si el elemento debe ser ignorado
          return (element as HTMLElement).className === 'panelButtons';
        }
      }).then(canvas => {
        this.imagenCreada = canvas.toDataURL();
        this.imgcreada = true;
        this.descargarComoImagen();
      });
    } else {
      // El elemento con id "contenido" no fue encontrado
      console.error('Elemento con id "contenido" no encontrado.');
    }
  }
  
  
  
  descargarComoImagen(): void {
    // Verificar si hay una imagen creada
    if (this.imagenCreada) {
      // Crear un enlace temporal
      const enlace = document.createElement('a');
      
      // Configurar el enlace con los datos de la imagen
      enlace.href = this.imagenCreada;
      enlace.download = '['+this.selectedRow.internal_identifier+'].png';
  
      // Simular un clic en el enlace para iniciar la descarga
      enlace.click();
    } else {
      console.error('No hay imagen para descargar.');
    }
  }
  
  
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    }

  isTecno(){
    if (this.management === 'Gerencias de Tecnologia' && this.isCheckedFullInfo) {
      
      this.tecno = true;
      this.displayedColumns = this.fullColumns;
    } else {
      this.displayedColumns = this.standartColumns;
    }
    
  }

  ngOnInit(): void {
    console.log('recargando componente')
    this.userCredential = this.authServices.getCredential();
    this.management = this.userCredential.userDetails.management;
    this.isTecno();
    
    this.setUserType();
    
    const payload = {      
      "email": this.userCredential.email,
      "max_result": 50,
      "projects":['GDD', 'TSTGDR', 'GT', 'GGDI']
    }
    this.payload = payload;

    const storedData = this.obtenerDelLocalStorage('requerimientos');

    if (storedData) {
      // Si hay datos en sessionStorage, utiliza esos datos
      this.issueData = storedData;
      this.dataSource = new MatTableDataSource(this.issueData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    } else {
      this.getIssueData(payload);
    }  

    if (this.sort) {
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = 'created';
    this.dataSource.sort.direction = 'asc';
  }
    
  }


  openModal(row : any) {
    this.selectedDescription = row.description;
    this.selectedRow = row;
  }

  formatToHtml(text: string): string {
    const lines = text.split('\n');
    let html = '';
  
    lines.forEach((line) => {
      const [label, value] = line.split(':');
  
      if (label && value) {
        const formattedLabel = label.trim();
        const formattedValue = value.trim();
  
        // Agregar estilos o clases según tus necesidades
        html += `<p><strong>${formattedLabel}:</strong> ${formattedValue}</p>`;
      }
    });
  
    return html;
  }
  
  setUserType(){
    if(this.management == 'Gerencias de Tecnologia' || this.management == 'Gerencias de Tecnología'){
      this.management = 'Gerencias de Tecnologia';
      this.userType = 'A'
    }
    else{
      this.userType = ''
    }
  }

 

  

  getIssueData(userData: any) {
    this.botonDesactivado = true;
    this.loading = true;
    this.issueService.getDataIssues(userData).subscribe(
      (response) => {

        this.issueData = response;  
        this.dataSource = new MatTableDataSource(this.issueData);
        this.dataSource.paginator = this.paginator;

        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.displayedColumns = this.standartColumns;
        this.guardarEnLocalStorage(this.issueData);
       
        this.dataError = false;
        this.botonDesactivado = false;
        this.changeDetectorRef.detectChanges();
        this.loading = false;
        window.location.reload()
      },

      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Maneja errores si es necesario
        this.issueData = [];
        this.loading = false;
        this.dataError = true;
        this.botonDesactivado = false;
      }
    );
    
  }

  expandColumns() {
    if (!this.isCheckedFullInfo) {
      this.displayedColumns = this.management == 'Gerencias de Tecnologia' ? this.fullColumns : this.standartColumns;
    } else {
      this.displayedColumns = this.standartColumns;
    }
  
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.changeDetectorRef.detectChanges();
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
  
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos} Hs`;
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


    guardarEnLocalStorage(datos:any): void {
      // const datos = { nombre: 'Ejemplo', edad: 25 };  
      // Guardar en sessionStorage
      this.storageService.guardarEnSessionStorage('requerimientos', datos);
      
   
    }

    obtenerDelLocalStorage(clave: string){
      const datosObtenidos = this.storageService.obtenerDesdeSessionStorage(clave);     
      return datosObtenidos 
    }
  
    // Ejemplo de cómo borrar un objeto JSON de sessionStorage
    borrarDatos(clave: string): void {
      this.storageService.borrarDesdeSessionStorage(clave);
    }
  }