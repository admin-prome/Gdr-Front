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
    // const client = new SecretClient(this.vaultUrl, this.credential);

    // const latestSecret = await client.getSecret(this.secretName);
    // console.log(`Latest version of the secret ${this.secretName}: `, latestSecret);
    // const specificSecret = await client.getSecret(this.secretName, { version: latestSecret.properties.version! });
    // console.log(`The secret ${this.secretName} at the version ${latestSecret.properties.version!}: `, specificSecret);
  }


  // async encryptData(data: string): Promise<string> {
  //   const secretName = "prueba"; // Reemplaza con el nombre correcto del secreto
    
  //   const client = new SecretClient(this.vaultUrl, secretName );

  //   // Obtener el secreto desde Azure Key Vault
  //   const secret = await client.getSecret(secretName);

  //   // Encriptar los datos utilizando el secreto obtenido
  //   const encryptedData = secret.value as string; // Realizar la operación de encriptación aquí

  //   return encryptedData;
  // }

  // async decryptData(encryptedData: string): Promise<string> {
  //   const secretName = "Provincia MicroEmpresas"; // Reemplaza con el nombre correcto del secreto
    
  //   const client = new SecretClient(this.vaultUrl);

  //   // Obtener el secreto desde Azure Key Vault
  //   const secret = await client.getSecret(secretName);

  //   // Desencriptar los datos utilizando el secreto obtenido
  //   const decryptedData = secret.value as string; // Realizar la operación de desencriptación aquí

  //   return decryptedData;
  // }



}
