import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: string | undefined; // Declaración de la propiedad firstName
  imgUser: string | undefined;
  showDropdown: boolean = false;
  showFiller = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  showButtons: boolean = false;
  
  mode = new FormControl('over' as MatDrawerMode);
  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  ngOnInit(): void {
    const userCredential = localStorage.getItem('credentialGDR');
      
    if (userCredential !== null) {
      const credentialObj = JSON.parse(userCredential);
      const name = credentialObj.name;
      this.showButtons = true;
      
      const [firstName] = name.split(" ");
      this.imgUser = credentialObj.picture;
      this.firstName = firstName; // Asignar el valor de firstName a la propiedad del componente
     
      // Hacer algo con el nombre
    } else {
      // El valor en el Local Storage es nulo, maneja este caso según tus necesidades
    }
    const currentUrl = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    

    
  }

  clearLocalStorage() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
  navigateToInformacion() {
    this.router.navigate(['home/version']);
  }

   navigateToHome() {
    this.router.navigate(['home']);
  }

  navigateTo(site: string){
    this.router.navigate([site]);
  }
}
