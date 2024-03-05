import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class KeyvaultServicesServices {
  private readonly vaultUrl = "https://tecnokeys.vault.azure.net/";

  private  readonly secretName = "Prueba";
  // private readonly credential = new DefaultAzureCredential();

  constructor() { }
  async getSecretKey() {
    const vaultName = "TecnoKeys";
  }


}
