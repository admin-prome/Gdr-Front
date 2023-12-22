import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsData, System, SystemsData } from 'src/app/data/interfaces/systemsData-inteface';
import { ApiConnectionService } from 'src/app/services/api-connection-service.service';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.css']
})


export class HelpPanelComponent implements OnInit {
  
  private unsubscribe$ = new Subject<void>();
  
  constructor(
          private connectionService: ApiConnectionService,
          private cdr: ChangeDetectorRef

          ) { }

  panelOpenState = false;
  data= localStorage.getItem('projectsData');
  systemsData: ProjectsData | undefined;
 
  issuetype = [
    {
      "name": "Requerimiento de Desarrollo",
      "description": "Necesidad del usuario final específicamente detallada de una funcionalidad, característica o capacidad que un software (CRM, Bases Negativas, desarrollo, etc), debe tener para satisfacer las necesidades del usuario. Esta especificación solicitada tiene como finalidad guiar en el proceso de desarrollo de software y sirve como base para el análisis, diseño,implementación y las pruebas, con su posterior pasaje a producción",
      "id": 1,
      "code": "REQ"
    },
    {
      "name": "Requerimiento de Infraestructura",
      "description": "Necesidad del usuario final para respaldar la ejecución de aplicaciones o sistemas. Incluye hardware, software, redes y otros componentes necesarios para garantizar el rendimiento, la seguridad y la disponibilidad de la infraestructura tecnológica.",
      "id": 2,
      "code": "INF"
    },
    {
      "name": "Incidente",
      "description": "Evento no planificado o no deseado que interrumpe o afecta negativamente el funcionamiento normal de un sistema, servicio o proceso. Puede variar en gravedad e incluir interrupciones del servicio, problemas de seguridad u otros eventos que requieran respuesta y resolución.",
      "id": 3,
      "code": "INC"
    },
    {
      "name": "Requerimiento Correctivo",
      "description": "Solicitud o especificación para corregir un defecto, error o problema identificado en un software o sistema. Surge como respuesta a fallos o comportamientos no deseados y busca rectificar la situación para restablecer el funcionamiento adecuado del sistema.",
      "id": 4,
      "code": "FIX"
    }
  ]
  systemsList: any[] = [];

  subissuetype: any[] = [];
  ngOnInit(): void {
    const localStorageData = localStorage.getItem('projectsData');

    if (localStorageData) {
      this.systemsData = JSON.parse(localStorageData) as ProjectsData;
      console.log('esto es sytemsData: ',this.systemsData);
      console.log(this.systemsList);
      this.transformarDatos(); 
      this.subissuetype = this.systemsList
      console.log(this.systemsList);
      console.log(this.subissuetype)
    } else {

      console.log('No existe projectsData, llamando al servicio...');
      this.llamarAlServicio();
      
    }

    this.connectionService.data$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: any | undefined) => {
      this.systemsData = data;
      this.transformarDatos();
      localStorage.setItem('projectsData', JSON.stringify(data));

      // Forzar la detección de cambios
      this.cdr.detectChanges();
    });

    }

    transformarDatos() {
      console.log('transformando datos', this.systemsData)
      // Verifica si existe la propiedad 'systems' en this.systemsData.data
      if (this.systemsData?.systems) {
        // Convierte el JSON original a la lista deseada
        this.systemsList = Object.values(this.systemsData?.systems).map(system => ({
          id: system.id,
          code: system.code,
          description: system.systemDescription,
          name: system.systemName
        }));
      }
      console.log(this.systemsList)
      this.subissuetype = this.systemsList
    }

    llamarAlServicio() {
      // Llama al método de tu servicio para obtener datos
      this.connectionService.GetAllProjects().subscribe(
        (data: ProjectsData) => {
          this.systemsData = data;

          this.transformarDatos();
          localStorage.setItem('projectsData', JSON.stringify(data));
          this.cdr.detectChanges();
          this.subissuetype = this.systemsList;
        },
        error => {
          console.error('Error al llamar al servicio:', error);
        }
      );
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
