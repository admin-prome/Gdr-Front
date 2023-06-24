import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: string | undefined; // Declaración de la propiedad firstName
  imgUser: string | undefined;
  showDropdown: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const userCredential = localStorage.getItem('userCredentialGDR');
    

  
      
    if (userCredential !== null) {
      const credentialObj = JSON.parse(userCredential);
      const name = credentialObj.name;
      
      console.log(name);
      const [firstName] = name.split(" ");
      this.imgUser = credentialObj.picture;
      this.firstName = firstName; // Asignar el valor de firstName a la propiedad del componente
      console.log(firstName);
      // Hacer algo con el nombre
    } else {
      // El valor en el Local Storage es nulo, maneja este caso según tus necesidades
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
}
