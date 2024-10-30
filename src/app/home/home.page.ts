import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router, private authService: AuthService) { }
  
  goToTransacciones() {
    this.router.navigate(['/transacciones'])
  }

  goToPresupuestos() {
    this.router.navigate(['/presupuestos'])
  }

  goToCategorias() {
    this.router.navigate(['/categorias'])
  }

  goToAnalisis() {
    this.router.navigate(['/analisis'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
