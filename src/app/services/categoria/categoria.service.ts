import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api/categorias'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getCategorias(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Crear un nuevo producto
  getCategoriasByTransaccion(transaccion: any, userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${transaccion}/${userId}`);
  }

  // Actualizar producto por ID
  createCategoria(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  updateCategoria(id: any ,categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar producto por ID
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
