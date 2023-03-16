import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {
    this.childMessage;
  }

  ngOnInit(): void {}

  reloadPage() {
    window.location.reload();
  }
}
