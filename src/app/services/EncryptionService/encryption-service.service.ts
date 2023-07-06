import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class EncryptionServiceService {
  private readonly key = environment.key;

  constructor() {}

  encryptData(data: string): string {
    return btoa(data);
  }


  decryptData(encodedData: string): string {
    return 'hola';
  };
  
}
