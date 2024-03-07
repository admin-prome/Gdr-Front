import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IssueCreate, IssuesInformation} from '../data/interfaces/issueCreate-interface';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataForm } from '../data/models/issue-create-form.models';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { SystemsData } from '../data/interfaces/systemsData-inteface';
@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {

  private urlApi = environment.baseUrl;
  public loading = false;
  
  private dataSubject = new Subject<SystemsData>();
  data$: Observable<SystemsData> = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  //Obtener todos los incidentes de jira por nombre de proyecto
  public GetIssuesInformation(
    inputValue: string
  ): Observable<IssuesInformation> {
    return this.http.get<IssuesInformation>(this.urlApi + 'Issues');
  }


  public GetAllProjects(): Observable<any> {
    const localStorageKey = 'projectsData'; // Clave para almacenar los datos en el localStorage
    const cachedData = localStorage.getItem(localStorageKey);
   
    let errorValue = false; // Valor por defecto para el campo "error"
  
    // Verificar si los datos están en el localStorage y no son nulos
    if (cachedData !== null) {
      const parsedData = JSON.parse(cachedData);
      // Acceder al valor del campo "error"
      if (parsedData.data && parsedData.data.approvers && parsedData.data.approvers.error) {
        errorValue = parsedData.data.approvers.error;
        if(errorValue){          
        localStorage.removeItem(localStorageKey);
        }
      }
  
    
  
      const cachedDataValid =
        parsedData.timestamp &&
        new Date().getTime() - parsedData.timestamp < 1 * 1 * 60 * 1000;
      
      if (cachedDataValid) {
        // Si los datos son válidos y el campo "error" no es true, retornarlos desde el localStorage
        return of(parsedData.data);
      }
    }
    
    // Si los datos no están en el localStorage, son inválidos o el campo "error" es true,
    // obtener los datos del backend
    return this.http.get<any>(this.urlApi + 'GetAllProjects').pipe(
      tap((data) => {
        // Verificar si el backend devuelve un objeto con error = true
        if (data.error) {
         
          return of([]); // Retornar un array vacío u otra información por defecto
        } else {
          // Almacenar los datos en el localStorage junto con la fecha actual
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ data: data, timestamp: new Date().getTime() })
          );
          return data; // Retornar los datos recibidos del backend
        }
      }),
      catchError((error) => {
        
        return of([]); // En caso de error, retornar un array vacío u otra información por defecto
      })
    );
  }
  

  public GetDataForm(): Observable<DataForm> {
    const url = this.urlApi + 'getallprojects';

    return this.http.get<any>(url).pipe(
      map(data => {
        const projects = data[0].projects;
        const initiatives = data[1].initiatives;
        return new DataForm(projects, initiatives);
      })
    );
  }


  //Crear un nuevo incidente en el backlog del proyecto
  

  public PostNewIssue(newIssue: FormData): Observable<any> {
    
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(this.urlApi + 'createissue',newIssue);

    //return this.http.post<JSON>(this.urlApi + 'createissue', newIssue);
  }

  public PostNewHigherAmount(newCredit: any): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization-Key': environment.AuthorizationKey,
      'Content-Type': 'application/json; charset=utf-8'      
    });
    
    
    return this.http.post<any>(this.urlApi + 'HigherAmount',newCredit,  { headers });
  
    //return this.http.post<JSON>(this.urlApi + 'createissue', newIssue);
  }
}
 



