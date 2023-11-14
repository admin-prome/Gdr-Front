export interface formStepper {
  type: string;
  key: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: Record<string, OptionItem[] | management[] | SubOption | number>;
  return?: string;
  required?: boolean;
  validators?:  Record<string,any>,
  value?: any,
  condition?: boolean;
  dependentOn?: string;
  dependencies?: Record<string, any> | string[];
  dependents?: string[] | string;
  accept?: string;
  maxFileSize?: number;
}


export interface FileOption {
  type: string;
  label: string;
  name: string;
  accept: string;
  maxFileSize: number;
}

export interface OptionItem {
  value: string;
  label: string;
  subIssueOptions?:SubOption[];
}

export interface SubOption {
  value: string;
  label: string;
}

export interface formValidators{
  
}

export interface JsonFormData {
  controls: Record<string, formStepper>
}

export interface management{
email: string, 
value: string, 
label: string, 
management: string
}

export interface fileTmb{
  fileRaw: File, 
  fileName: string
}


export interface OrderedForm {
  [key: string]: any; // Puedes ajustar 'any' a un tipo específico si es necesario
}
// type: string;
//   key: string;
//   label: string;
//   name: string;
//   placeholder: string;
//   options: {
//     [key: string]: { value: string; label: string }[];
//   };
//   required: boolean;
//   condition: boolean;
//   dependentOn: string;
//   dependencies: {
//     [key: string]: { value: string; label: string }[];
//   };
//   return: string;


// export interface formStepper {
//   type: string;
//   key: string;
//   label: string;
//   name: string;
//   placeholder?: string;
//   options?: Record<string, OptionItem>;    
//   return: string;
//   required?: boolean;
//   condition?: boolean;
//   dependentOn?: string;
//   dependencies?: Record<string, any>;
//   dependents?: string[];

// }

// interface OptionItem {
//   options: {
//     [key: string]: Item[] | string;
//   };
// }




// interface OptionItem {
//   value: string;
//   label: string;
//   subIssueOptions?: {
//     value: string;
//     label: string;
//   }[]
// }
