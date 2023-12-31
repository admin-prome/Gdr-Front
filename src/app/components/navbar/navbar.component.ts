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
    const userCredential = localStorage.getItem('credentialGDR');
    

  
      
    if (userCredential !== null) {
      const credentialObj = JSON.parse(userCredential);
      const name = credentialObj.name;
      
      
      const [firstName] = name.split(" ");
      this.imgUser = credentialObj.picture;
      this.firstName = firstName; // Asignar el valor de firstName a la propiedad del componente
     
      // Hacer algo con el nombre
    } else {
      // El valor en el Local Storage es nulo, maneja este caso según tus necesidades
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
}
