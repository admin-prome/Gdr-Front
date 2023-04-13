import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { ApiConnectionService } from 'src/app/services/api-connection-service.service';
import { IssueCreate } from 'src/app/interfaces/issueCreate-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from '../../modules/material/shared.module';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Project } from '../../models/projects.models';
import { Initiatives } from '../../models/initiatives.models';

@Component({
  selector: 'app-issue-create-form',
  templateUrl: './issue-create-form.component.html',
  styleUrls: ['./issue-create-form.component.css'],
})
export class IssueCreateFormComponent implements OnInit {
  @Input() dataEntry: any;
  loading = false;
  clicked = false;
  attached = '';
  projectSelected = '';
  approveSelected = '';
  selected = '';
  requestForm : any;
  dataJsonNewIssue: any;
  projectsList: any;
  initiativesList: Array<any> = [];
  finalDate: string = '';
  normativeDate: string = '';
  formError: boolean = false;
  receivedData: boolean = false;
  audio = new Audio('../../../assets/sound/sound.mp3');
  snackBar: any;
  initiatives!: Initiatives;
  projects!: Project;

 

  constructor(
    private fb: FormBuilder,
    private ConnectionService: ApiConnectionService,
    private router: Router
  ) {
    this.loadSpinner();
    this.projectsList = [];
    // this.initiatives;
    
    this.dataJsonNewIssue = {};
    this.dataJsonNewIssue = new IssueCreate();
    this.dataEntry = '';

    this.requestForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      project: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      approvers: new FormControl('', [Validators.required]),
      managment: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      impact: new FormControl('', [Validators.required]),
      attached: new FormControl(''),
      finalDate: new FormControl(''),
      normativeDate: new FormControl(''),
      initiative: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadSpinner();
    this.getAllProjects();
    // this.getDataForm();
  }

  getAllProjects(): any {
    this.ConnectionService.GetAllProjects().subscribe((response) => {
      this.projectsList = response[0].projects;
      this.initiativesList = Object.values(response[1].initiatives);
      console.log('---------------------------');
      console.log(this.projectsList);
      console.log(this.initiativesList);
      console.log('---------------------------');
      
    });
  }

  // getDataForm(): any{
  //   this.ConnectionService.GetDataForm().subscribe((response) => {
  //     this.initiatives = response.initiatives;
  //     console.log(this.initiatives)
  //     // this.projects = response.projects;
  //   })
  // }

  sendForm() {
    this.validateForm();

    if (this.requestForm.invalid != true) {
      this.ConnectionService.PostNewIssue(this.dataJsonNewIssue).subscribe(
        (response) => {
          this.dataEntry = Object.values(response);
          this.receivedData = true;
          this.audio.play();
          this.requestForm.clearAsyncValidators();
          this.loadSpinner();
        },
        (error) => {
          console.error(error);
          this.formError = true;
          this.displaySnackbar(
            'Su requerimiento no pudo ser creado. Por favor, reenvie el formulario'
          );
        }
      );
    } else {
      this.displaySnackbar(
        'Por favor, complete los campos requeridos para enviar'
      );
    }
  }

  formatDate(finalDate: any): any {
    const fechaFormateada = formatDate(finalDate, 'yyyy-MM-dd', 'en-US');
    return fechaFormateada;
  }

  displaySnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public loadSpinner() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  validateForm() {
    const finalDate = this.requestForm.value.finalDate;
    const normativeDate = this.requestForm.value.normativeDate;
    this.dataJsonNewIssue.key = this.requestForm.value.project;
    this.dataJsonNewIssue.summary = this.requestForm.value.title;
    this.dataJsonNewIssue.priority = this.requestForm.value.priority;
    this.dataJsonNewIssue.approvers = this.requestForm.value.approvers;
    this.dataJsonNewIssue.managment = this.requestForm.value.managment;
    this.dataJsonNewIssue.description = this.requestForm.value.description;
    this.dataJsonNewIssue.impact = this.requestForm.value.impact;
    this.dataJsonNewIssue.attached = this.requestForm.value.attached;
    this.dataJsonNewIssue.initiative = this.requestForm.value.initiative;
    this.dataJsonNewIssue.type = 'Epic';

    if (finalDate.length != 0) {
      this.dataJsonNewIssue.finalDate = this.formatDate(finalDate);
    }

    if (normativeDate.length != 0) {
      this.dataJsonNewIssue.normativeDate = this.formatDate(normativeDate);
    }

    return this.dataJsonNewIssue;
  }
}
