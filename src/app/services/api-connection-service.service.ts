import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IssueCreate, IssuesInformation} from '../interfaces/issueCreate-interface';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataForm } from '../models/issue-create-form.models';
import { map } from 'rxjs/operators';
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
    const response =  this.http.get<any>(this.urlApi + 'getallprojects');
    response.subscribe(
      (data) => {
          console.log(data);
      },
      (error) => {
          console.log(error);
      }
  );

    return response;

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
    console.log(newIssue)
    return this.http.post<JSON>(this.urlApi + 'createissue', newIssue);
  }
}
