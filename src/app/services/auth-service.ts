import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  getCredential() {
    const userCredential = localStorage.getItem('credentialGDR');
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);
      return userObject;
    }
  }

  isAuthenticated() {
    const userCredential = localStorage.getItem('credentialGDR');
   
    if (userCredential) {      
      const userObject = JSON.parse(userCredential);

      // Obtener la fecha actual
      const currentDate: Date = new Date();

      // Obtener la fecha del timestamp en el userCredential
      const timestampDate: Date = new Date(userObject.timestamp);

      // Calcular la diferencia en días
      const dayDifference: number = Math.floor((currentDate.getTime() - timestampDate.getTime()) / (1000 * 60 * 60 * 24));

      // Cerrar la sesión si la diferencia es mayor a 30 días o si no existe idJIRA
      if (userObject.idJIRA && dayDifference <= 15) {
        return true;
      }

      // Si la diferencia es mayor a 30 días o no existe idJIRA, se considera no autenticado
      localStorage.clear();
      return false;
    }

    return false;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // Redirigir al login (puedes ajustar la ruta según tu configuración)
    window.location.href = '/login';
    return true;
  }
}
