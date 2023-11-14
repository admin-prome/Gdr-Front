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
    this.issueData = this.childMessage;

  }

  reloadPage() {
    window.location.reload();
  }
}
