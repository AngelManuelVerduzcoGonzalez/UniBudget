import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getUser(username: any, password: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}/${password}`);
  }

  // Crear un nuevo producto
  createUser(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
