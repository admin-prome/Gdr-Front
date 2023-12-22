import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  
  @Input() dataCards: any;
  constructor(public dialog: MatDialog) { }

  data: any = [];

  ngOnInit(): void {
    console.log('iniciando app-card')
    this.actualizarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('detectanto cambios en app-card');
    console.log(this.dataCards)
    if (changes['dataCards'] && changes['dataCards'].currentValue) {
      this.actualizarDatos();
    }
  }

  private actualizarDatos() {
    console.log('actualizando datos en app-card')
    this.data = this.dataCards;
  }



}
