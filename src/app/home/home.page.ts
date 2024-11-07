import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private authService: AuthService, private translate: TranslateService) {}
  
  goToTransacciones() {
    this.router.navigate(['/transactions'])
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

  goToIdioma() {
    this.router.navigate(['/idioma'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
