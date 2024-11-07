import { Component } from '@angular/core';
import { CopiaSeguridadService } from '../services/copiaSeguridad/copia-seguridad.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copia-seguridad',
  templateUrl: './copia-seguridad.page.html',
  styleUrls: ['./copia-seguridad.page.scss'],
})
export class CopiaSeguridadPage {
  constructor(private backupService: CopiaSeguridadService, private authService: AuthService, private router: Router) {}

  backupDatabase() {
    this.backupService.createBackup();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
