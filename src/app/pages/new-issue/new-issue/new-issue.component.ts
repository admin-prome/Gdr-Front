import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

  constructor() {
    console.log('NewIssueComponent constructor.');
  }

  ngOnInit(): void {
    console.log('NewIssueComponent initialized.');
  }
}
