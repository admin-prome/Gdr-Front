import { Component, Input, OnInit } from '@angular/core';
import { IssueStepperCreateComponent } from '../issue-stepper-create/issue-stepper-create.component';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {

  @Input() sharedState: any;
  @Input() input: any;
  keysServices: string[] = [];
  dataServices: any;
  
  constructor(private stepper: IssueStepperCreateComponent) { }

  ngOnInit(): void {
    this.dataServices = this.stepper.dataServices;    
    this.keysServices = Object.keys(this.dataServices);
  
  }

}
