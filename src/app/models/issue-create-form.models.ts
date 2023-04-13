import { Initiatives } from "./initiatives.models";
import { Project } from "./projects.models";


  export class DataForm {
    projects: Project[];
    initiatives: Initiatives;
    
    constructor(projects: Project[], initiatives: Initiatives) {
      this.projects = projects;
      this.initiatives = initiatives;
    }
  }
  