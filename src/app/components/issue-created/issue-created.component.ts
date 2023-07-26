import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-issue-created',
  templateUrl: './issue-created.component.html',
  styleUrls: ['./issue-created.component.css'],
})
export class IssueCreatedComponent implements OnInit {
  dataNewIssue: Array<any> = [];

  @Input() childMessage: any;

  message: Array<any> = [];
  init = false;
  issueData: any;

  constructor(
    private sharedDataService: SharedDataService
  ) {
    this.childMessage;
  }

  ngOnInit(): void {
    this.issueData = this.sharedDataService.getReceivedData();
    console.log('Esto es la info recibida', this.issueData);
    console.log('data: ', this.issueData[0])

  }

  reloadPage() {
    window.location.reload();
  }
}
