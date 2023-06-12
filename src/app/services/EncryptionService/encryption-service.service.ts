import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class EncryptionServiceService {
  private readonly key = environment.key;

  constructor() {}

  encryptData(data: string): string {
    console.log('esto es la data por encriptar: ', data)
    return btoa(data);
  }


  decryptData(encodedData: string): string {
    console.log('esto es la data por desencriptar: ', encodedData)
    return 'hola';
  };
  
}
