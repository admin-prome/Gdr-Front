import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
//MODULOS
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//ANGULAR MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatExpansionModule} from '@angular/material/expansion';


import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,   
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    
  ],
  
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  ],

  exports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,    
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    MatListModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    
  ],
})
export class MaterialSharedModule {}
