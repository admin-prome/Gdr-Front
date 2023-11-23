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

  openDialog(DialogContent: any) {
    const htmlContent = `
      <p>Contenido del diálogo</p>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    `;

    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  optionSelected(selected: any){
    console.log('se eligio la opcion: ', selected);
    return selected
  }

}
