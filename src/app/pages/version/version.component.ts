import { Component, OnInit } from '@angular/core';
import { VersionData } from 'src/app/data/interfaces/version-data-interface';
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  versionData: VersionData = {
    name: 'Gestor de Requerimientos',
    version: '1.1.0',
    author: 'Millan Maximiliano',
    gerencia:'Tecnología',
    contactEmail: 'mmillan@provinciamicrocreditos.com',
    targetAudience: 'Provincia Microcréditos'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
