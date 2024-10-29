import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private apiUrl = 'http://localhost:3000/api/ingresos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getIngresos(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Crear un nuevo producto
  createIngreso(ingreso: any): Observable<any> {
    return this.http.post(this.apiUrl, ingreso);
  }

  // Actualizar producto por ID
  updateIngreso(id: number, ingreso: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ingreso);
  }

  // Eliminar producto por ID
  deleteIngreso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
