import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueCreate, IssuesInformation} from '../interfaces/issueCreate-interface';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataForm } from '../models/issue-create-form.models';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {

  private urlApi = environment.baseUrl;
  public loading = false;

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
  
  //Obtener todos los nombres y keys de proyectos en jira
  // public GetAllProjects(): Observable<any> { 
  //   const response =  this.http.get<any>(this.urlApi + 'GetAllProjects');
  //   response.subscribe(
  //     (data) => {

  //     },
  //     (error) => {
  //         console.log('Ocurrio un error al mostrar los proyectos')
          
  //     }
  // );
    
  //   return response;

  // }

  public GetAllProjects(): Observable<any> {
    const localStorageKey = 'projectsData'; // Clave para almacenar los datos en el localStorage
    const cachedData = localStorage.getItem(localStorageKey);
  
    // Verificar si los datos están en el localStorage
    const cachedDataValid = cachedData &&
      JSON.parse(cachedData).timestamp &&
      new Date().getTime() - JSON.parse(cachedData).timestamp < 1 * 5 * 60 * 1000;
  
    if (cachedDataValid) {
      // Si los datos son válidos, retornarlos desde el localStorage
      return of(JSON.parse(cachedData).data);
    } else {
      // Si los datos no están en el localStorage o son inválidos, obtenerlos del backend
      return this.http.get<any>(this.urlApi + 'GetAllProjects').pipe(
        tap((data) => {
          // Almacenar los datos en el localStorage junto con la fecha actual
          localStorage.setItem(localStorageKey, JSON.stringify({ data: data, timestamp: new Date().getTime() }));
        }),
        catchError((error) => {
          console.log('Ocurrió un error al mostrar los proyectos');
          return of([]); // En caso de error, retornar un array vacío u otra información por defecto
        })
      );
    }
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
  public PostNewIssue(newIssue: JSON): Observable<JSON> {
   
    return this.http.post<JSON>(this.urlApi + 'createissue', newIssue);
  }
}
