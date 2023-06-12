
export interface Issue{
  description: string;
  key: string;
  nameReporter: string;
  summary: string;
}


export interface IssuesInformation{

  page: Number;
  per_page: Number;
  support: any;
  total: Number;
  total_pages: Number;
  data: Issue[];
}

export class IssueCreate{

    key: string = '';
    summary:string = '';
    description: string = '';
    type: string = '';
    //assignee:string = '';
    //reporter:string = '';
    //labels: string = '';
    //created: string = '';
    normativeDate: string | undefined = undefined ;
    //endDate: string = '';
    //initialDate: string = '';
    finalDate: string | undefined = undefined;
    approvers: string = '';
    //changeReason: string = '';
    //score: string = '';
    impact: string = '';
    attached: string = '';
    //skill: string = '';
    managment: string = '';
    //spring: string = '';
    priority: string = '';
    userCredential: JSON | undefined;

}


// export interface IssueInfo{
//   message: string;
// }

