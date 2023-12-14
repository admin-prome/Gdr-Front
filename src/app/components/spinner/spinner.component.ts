import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {

  constructor() { }
  @Input() loading: boolean = false;
  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent],
})
export class ImgCardModule {}

