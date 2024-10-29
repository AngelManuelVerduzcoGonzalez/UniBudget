// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: any = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  // Simula el estado de autenticación almacenado en localStorage
  isAuthenticated(): boolean {
    const user = localStorage.getItem('loggedInUser');
    return !!user; // Retorna true si existe un usuario logueado
  }

  // Modificación de login para manejar el Observable de la API de forma asíncrona
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.usuarioService.getUser(username, password).subscribe({
        next: (response) => {
          if (response) {
            this.usuario = response;
            console.log(this.usuario)
            if (this.usuario.length != 0) {
              const { id, username } = this.usuario 
              localStorage.setItem('loggedInUser', JSON.stringify(id, username));
              resolve(true); // Login exitoso
            } else {
              resolve(false)
            }
          } else {
            resolve(false); // Usuario no encontrado o contraseña incorrecta
          }
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
          reject(false);
        }
      });
    });
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
