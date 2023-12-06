import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // Función para guardar un objeto JSON en sessionStorage
  guardarEnSessionStorage(key: string, objeto: any): void {
    const objetoString = JSON.stringify(objeto);
    sessionStorage.setItem(key, objetoString);
  }

  // Función para obtener un objeto JSON desde sessionStorage
  obtenerDesdeSessionStorage(key: string): any {
    const objetoString = sessionStorage.getItem(key);
    if (objetoString) {
      return JSON.parse(objetoString);
    }
    return null;
  }

  // Función para borrar un objeto JSON de sessionStorage
  borrarDesdeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }
}
