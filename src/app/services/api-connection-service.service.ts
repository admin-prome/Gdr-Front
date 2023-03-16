import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueCreate, IssuesInformation} from '../interfaces/issueCreate-interface';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  public GetAllProjects(): Observable<any> {
    console.log(this.urlApi,'esta es la urlapi');
    return this.http.get<any>(this.urlApi + 'GetAllProjects');

  }

  //Crear un nuevo incidente en el backlog del proyecto
  public PostNewIssue(newIssue: JSON): Observable<JSON> {
    return this.http.post<JSON>(this.urlApi + 'CreateIssue', newIssue);
  }
}
