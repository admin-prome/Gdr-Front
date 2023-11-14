import { FormGroup } from "@angular/forms";

export interface FormStep {
    label: string;
    inputLabel: string;
    inputPlaceholder: string;
    inputName: string;
    required: boolean;
    formGroup: FormGroup;
    
  }
  