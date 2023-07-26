import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private receivedData: any; // Variable para almacenar los datos recibidos

  constructor() { }

  setReceivedData(data: any) {
    this.receivedData = data;
  }

  getReceivedData() {
    return this.receivedData;
  }
}
