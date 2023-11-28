import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  @Input() dataCards: any;
  constructor(public dialog: MatDialog) { }

  data: any = [];

  ngOnInit(): void {
    this.data = this.dataCards;  
    
  }



}
