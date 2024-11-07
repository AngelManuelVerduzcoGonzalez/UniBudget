import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss']
})
export class IdiomaPage {
  constructor(private translate: TranslateService, private authService: AuthService, private router: Router) {}

  cambiarIdioma(idioma: string) {
    this.translate.use(idioma);
    localStorage.setItem('idioma', idioma); // Guarda el idioma elegido
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
