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
  
  infra: any[] = [
    {
      "name": "ABM (Alta, Baja y Modificación)",
      "description": "Requerimientos relacionados con la administración de usuarios dentro de sistemas específicos. Incluye actividades de Alta, Baja y Modificación (ABM) de cuentas de usuario, así como la gestión de permisos, roles y privilegios asociados. Este subtipo abarca solicitudes para crear, actualizar o eliminar cuentas de usuario.",
      "id": 1,
      "code": "ABM"
    },
    {
      "name": "Seguridad Informática",
      "description": "Requerimientos centrados en la seguridad de la infraestructura informática. Esto abarca aspectos como la implementación de medidas de seguridad, la gestión de accesos, la protección contra amenazas cibernéticas y la aplicación de políticas de seguridad.",
      "id": 2,
      "code": "INF"
    },
    {
      "name": "Infraestructura General",
      "description": "Requerimientos que no se clasifican específicamente en las categorías anteriores. Pueden abarcar aspectos generales de la infraestructura que no se limitan a la administración o la seguridad. Esto puede incluir cambios, mejoras o solicitudes que no caen en las categorías más específicas.",
      "id": 3,
      "code": "SEG"
    },
  ];
  detail: any[] = [
    {
      "name": "Acceso Web Seguro",
      "description": "La plataforma proporciona un acceso web seguro mediante autenticación de usuarios. Los usuarios pueden ingresar a la plataforma con sus credenciales correspondientes, lo que garantiza un entorno protegido y controlado.",
      "id": 1,
      "code": ""
    },
    {
      "name": "Integración con Jira",
      "description": "Aprovechando la potencia de Jira, el Gestor de Requerimientos se conecta de manera transparente con la API de Jira. Esto permite la carga y visualización de requerimientos sin que los usuarios necesiten acceso directo o permisos en la plataforma Jira.",
      "id": 2,
      "code": ""
    },
    {
      "name": "Carga de Requerimientos Simplificada",
      "description": "Los usuarios pueden cargar nuevos requerimientos de manera sencilla a través de una interfaz intuitiva en la plataforma. La información ingresada se sincroniza automáticamente con Jira, eliminando la necesidad de ingresar manualmente los datos en ambas plataformas.",
      "id": 3,
      "code": ""
    },
    {
      "name": "Gestión Integral de Proyectos",
      "description": "Además de la carga de requerimientos, el Gestor de Requerimientos ofrece funciones para la gestión completa de proyectos. Los usuarios pueden asignar tareas, dar seguimiento al progreso y colaborar de manera eficiente, todo ello respaldado por las funcionalidades avanzadas de Jira.",
      "id": 4,
      "code": ""
    },
    {
      "name": "Seguimiento en Tiempo Real",
      "description": "La plataforma proporciona un tablero de control que permite a los usuarios realizar un seguimiento en tiempo real del estado de los requerimientos y proyectos. Gráficos y métricas visuales facilitan la toma de decisiones informadas.",
      "id": 5,
      "code": ""
    }

    ]
  
  constructor(
          private connectionService: ApiConnectionService,
          private cdr: ChangeDetectorRef

          ) {
            
           }

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

    if (this.data) {
      this.systemsData = JSON.parse(this.data) as ProjectsData;
      console.log('esto es sytemsData: ',this.systemsData);     
      this.transformarDatos(); 
      this.subissuetype = this.systemsList
      console.log(this.systemsList);
      console.log(this.subissuetype);

    } else {

      console.log('No existe projectsData, llamando al servicio...');
      this.llamarAlServicio();
      
    }

    this.connectionService.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: SystemsData | undefined) => {
          this.systemsData = data;
          if (this.systemsData) {
            this.transformarDatos();
            localStorage.setItem('projectsData', JSON.stringify(data));
            this.cdr.detectChanges();
          }
        },
        error => {
          console.error('Error al llamar al servicio:', error);
        }
      );



    }

    transformarDatos() {
      const systemsData = this.systemsData as SystemsData;
      console.log('transformando datos', systemsData?.data?.systems);
    
      if (systemsData?.data?.systems) {
        this.systemsList = Object.values(systemsData.data.systems).map(system => ({
          id: system.id,
          code: system.code,
          description: system.systemDescription,
          name: system.systemName
        }));
      }
    
      console.log('Esto es systems list: ', this.systemsList);
      this.subissuetype = this.systemsList;
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
          window.location.reload()
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
